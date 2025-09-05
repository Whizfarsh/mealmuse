const { promisify } = require("util");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const sendEmail = require("../utils/email");
const crypto = require("crypto");

const token = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

const createToken = (user, statusCode, res) => {
	const newtoken = token(user._id);

	const cookieOptions = res.cookie("jwt", newtoken, {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIES_EXPIRES * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
		sameSite: "lax",
	});

	if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

	res.status(statusCode).json({
		status: "success",
		newtoken,
		user,
	});
};

exports.signup = catchAsync(async (req, res, next) => {
	const newUser = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		passwordConfirm: req.body.passwordConfirm,
		passwordChangedAt: req.body.passwordChangedAt,
	});

	// newUser.password === undefined;

	// console.log(newUser);
	// createToken(newUser, 201, res);
	const newToken = token(newUser._id);
	res.status(201).json({
		status: "success",
		newToken,
		data: {
			user: newUser,
		},
	});
});

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new AppError("Invalid email or password", 403));
	}
	//checking if user exists and password is correct
	const user = await User.findOne({ email }).select("+password");

	if (!user || !(await user.correctPassword(password, user.password))) {
		return next(
			new AppError("Email or password is not correct, please try again!", 403)
		);
	}

	createToken(user, 200, res);
});

exports.logout = catchAsync(async (req, res, next) => {
	res.cookie("jwt", "loggedout", {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true,
		sameSite: "lax",
	});

	res.status(200).json({
		status: "Success",
	});
});

exports.protect = catchAsync(async (req, res, next) => {
	let token;
	if (req.cookies && req.cookies.jwt) {
		token = req.cookies.jwt;
	} else if (!req.headers || !req.headers.authorization) {
		return next(
			new AppError("Unathorized access to this information, please login", 401)
		);
	} else if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	}

	const decodedToken = await promisify(jwt.verify)(
		token,
		process.env.JWT_SECRET
	);

	const currentUser = await User.findById(decodedToken.id);
	if (!currentUser) {
		return next(new AppError("The user no longer exist, please login!", 401));
	}

	if (currentUser.changedPasswordAfter(decodedToken.iat)) {
		return next(new AppError("Sorry, you have to login again", 401));
	}

	//access to route
	req.user = currentUser;
	next();
});

exports.restrictTo = (...roles) => {
	return (req, res, next) => {
		console.log(roles);
		console.log(req.user.userRole);
		if (!roles.includes(req.user.userRole)) {
			return next(new AppError("You are not autherized for this action", 401));
		}
		next();
	};
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		return next(
			new AppError("User with this information can not be found", 404)
		);
	}

	const resetToken = user.getResetToken();
	await user.save({ validateBeforeSave: false });

	const resetURL = `${req.protocol}://${req.get(
		"host"
	)}/api/v1/users/resetPassword/${resetToken}`;
	const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nif you didn't forget your password please ignore this email!`;

	try {
		await sendEmail({
			email: user.email,
			subject: "Here is your password reset link( expires in 10 min)",
			message,
		});

		res.status(200).json({
			status: "success",
			message: "Password token sent to the email!",
		});
	} catch (err) {
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
		await user.save({ validateBeforeSave: false });

		return next(new AppError("There is an error somewhere", 500));
	}
});

exports.resetPassword = catchAsync(async (req, res, next) => {
	// const resetToken = req.params.token;
	const hashToken = crypto
		.createHash("sha256")
		.update(req.params.token)
		.digest("hex");

	const user = await User.findOne({
		passwordResetToken: hashToken,
		passwordResetExpires: { $gt: Date.now() },
	});

	if (!user) {
		next(new AppError("Token Expired or no longer valid", 400));
	}

	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	user.passwordResetToken = undefined;
	user.passwordResetExpires = undefined;
	await user.save();

	createToken(user, 201, res);
});

exports.updateMyPassword = catchAsync(async (req, res, next) => {
	const user = await User.findById(req.user.id).select("+password");

	if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
		return next(new AppError("Please login", 401));
	}

	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	await user.save();

	createToken(user, 200, res);
});
