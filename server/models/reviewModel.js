const mongoose = require("mongoose");
const User = require("../models/userModel");
const Recipe = require("../models/recipesModel");

const reviewSchema = new mongoose.Schema(
	{
		review: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			required: true,
			min: 1,
			max: 5,
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: [true, "a user is required"],
		},
		recipe: {
			type: mongoose.Schema.ObjectId,
			ref: "Recipe",
			required: [true, "review must belong to a recipe"],
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
	},
	{
		toJSON: {
			virtuals: true,
			transform: (_, ret) => {
				delete ret.id;
				return ret;
			},
		},
		toObject: {
			virtuals: true,
			transform: (_, ret) => {
				delete ret.id;
				return ret;
			},
		},
	}
);

reviewSchema.index({ recipe: 1, user: 1 }, { unique: true });

//calac rating stats
reviewSchema.statics.calcAvgrating = async function (recipeId) {
	const stats = await this.aggregate([
		{
			$match: { recipe: recipeId },
		},
		{
			$group: {
				_id: "$recipe",
				nRating: { $sum: 1 },
				avgRating: { $avg: "$rating" },
			},
		},
	]);
	console.log(stats[0].nRating);
	if (stats.length > 0) {
		await Recipe.findByIdAndUpdate(recipeId, {
			ratingsQuantity: stats[0].nRating,
			ratingsAverage: stats[0].avgRating,
		});
	} else {
		await Recipe.findById(recipeId, {
			ratingsQuantity: 0,
			ratingsAverage: 0,
		});
	}
};

//calling the calAvgrating
reviewSchema.post("save", function () {
	this.constructor.calcAvgrating(this.recipe);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
	this.r = await this.findOne();
	next();
});

reviewSchema.post(/^findOneAnd/, async function () {
	await this.r.constructor.calcAvgrating(this.r.recipe);
});
///////////////

reviewSchema.pre(/^find/, function (next) {
	// this.populate({ path: "user", select: "name" });
	this.select("-id");
	this.populate({ path: "user", select: "-_id name" });
	next();
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
