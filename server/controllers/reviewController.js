const Review = require("../models/reviewModel");
const factory = require("./handlerFactory");

exports.setReviewParams = (req, res, next) => {
	if (!req.body.recipe) req.body.recipe = req.params.recipeId;
	if (!req.body.user) req.body.user = req.user.id;
	next();
};

exports.getReviews = factory.getAll(Review);
exports.createReview = factory.createOne(Review);
exports.getReview = factory.getOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
