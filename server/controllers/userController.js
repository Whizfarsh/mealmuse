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

//////
exports.getAllUsers = factory.getAll(User);
exports.createUser = factory.createOne(User);
exports.getUser = factory.getOne(User);

//can't use to update password
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

//
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

exports.saveRecipe = catchAsync(async (req, res, next) => {
	const { savedRecipe } = req.body;
	const newSavedRecipes = await User.findByIdAndUpdate(
		req.user.id,
		{
			$addToSet: { savedRecipe },
		},
		{
			new: true,
			runValidators: true,
		}
	).populate({
		path: "savedRecipe",
		select: "name image cookingDuration totalServings",
	});

	if (!newSavedRecipes) {
		return next(new AppError("User not found", 404));
	}

	res.status(200).json({
		status: "success",
		Results: newSavedRecipes.savedRecipe.length,
		data: newSavedRecipes.savedRecipe,
	});

	// const newSavedRecipes = user.saveRecipe.
});

exports.deleteSavedRecipe = catchAsync(async (req, res, next) => {
	const { id } = req.body;
	const user = await User.findByIdAndUpdate(
		req.user.id,
		{
			$pull: { savedRecipe: id },
		},
		{
			new: true,
			runValidators: true,
		}
	).populate({
		path: "savedRecipe",
		select: "name image cookingDuration totalServings",
	});
	res.status(200).json({
		status: "success",
		data: user.savedRecipe,
	});
});
