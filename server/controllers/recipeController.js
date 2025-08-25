const Recipe = require("../models/recipesModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const factory = require("./handlerFactory");
/////////////

exports.setUserParams = (req, res, next) => {
	if (!req.body.createdBy) req.body.createdBy = req.user.id;
	next();
};

exports.getAllRecipes = factory.getAll(Recipe);
exports.createRecipe = factory.createOne(Recipe);
exports.getRecipe = factory.getOne(Recipe, [
	{ path: "diets", select: "name -_id" },
	{ path: "cuisines", select: "name -_id" },
	{
		path: "reviews",
		select: "review rating -recipe -_id ",
	},
]);
exports.updateRecipe = factory.updateOne(Recipe);
exports.deleteRecipe = factory.deleteOne(Recipe);
