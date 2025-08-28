const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const factory = require("./handlerFactory");

const filterObj = (obj, ...otherFields) => {
	const newObj = {};
	Object.keys(obj).forEach((el) => {
		if (otherFields.includes(el)) newObj[el] = obj[el];
	});
	return newObj;
};

///
exports.getMe = catchAsync(async (req, res, next) => {
	const user = await User.findById(req.user.id);

	if (!user) {
		return next(new AppError("No user found", 404));
	}

	res.status(200).json({
		status: "success",
		user,
	});
});

exports.updateMyProfile = catchAsync(async (req, res, next) => {
	if (req.body.password || req.body.passwordConfirm) {
		return next(
			new AppError(
				"You are not allowed to update password here, please use /updateMyPassword",
				400
			)
		);
	}

	const filteredBody = filterObj(req.body, "name", "email");
	const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: "success",
		data: {
			user: updatedUser,
		},
	});
});

exports.deleteMyProfile = catchAsync(async (req, res, next) => {
	await User.findByIdAndUpdate(req.user.id, { isActive: false });

	res.status(204).json({
		status: "success",
		data: null,
	});
});

exports.userSavedRecipes = catchAsync(async (req, res, next) => {
	const user = await User.findById(req.user.id).populate({
		path: "savedRecipe",
		select: "name image cookingDuration totalServings",
	});

	if (!user) {
		return next(new AppError("User not found", 404));
	}

	res.status(200).json({
		status: "success",
		results: user.savedRecipe.length,
		data: {
			savedRecipes: user.savedRecipe,
		},
	});
});

//////
exports.getAllUsers = factory.getAll(User);
exports.createUser = factory.createOne(User);
exports.getUser = factory.getOne(User);

//can't use to update password
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
