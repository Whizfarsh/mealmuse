const mongoose = require("mongoose");
const slugify = require("slugify");
const User = require("./userModel");

const recipeSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Your Recipe must have a name"],
			unique: true,
			trim: true,
			minLength: [10, "Minimum character should be more than 10"],
			maxLength: [60, "Maximum character should be less than or equal 10"],
		},
		slug: String,
		summary: {
			type: String,
			required: [true, "Your Recipe must have summary"],
		},
		instruction: {
			type: [String],
			default: ["lorem5", "loren6", "lorem7"],
		},
		ingredients: {
			type: [String],
			required: [true, "You need to add the ingredients"],
		},
		nutrients: Array,
		diets: {
			type: [mongoose.Schema.ObjectId],
			ref: "Diets",
			required: [true, "You need to include the diets your recipe belongs to"],
		},
		cuisines: {
			type: [mongoose.Schema.ObjectId],
			ref: "Cuisine",
			required: [
				true,
				"You need to include the cuisine your recipe belongs to",
			],
		},
		preparationTime: {
			type: Number,
			required: [true, "Please insert preparation duration"],
		},
		cookingDuration: {
			type: Number,
			required: [true, "Please insert cooking duration"],
			min: [5, "Your cooking duration should not be less than 5"],
		},
		ratingsQuantity: {
			type: Number,
			default: 1,
			min: 1,
			max: 5,
		},
		ratingsAverage: {
			type: Number,
			default: 0,
			set: (val) => Math.floor(val * 10) / 10,
		},
		totalServings: {
			type: Number,
			required: [true, "You need to put the total number of servings"],
		},
		image: String,
		createdBy: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: [true, "The recipe must be created by a user"],
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
	},
	{
		toJSON: {
			virtuals: true,
			versionKey: false,
			transform: (_, ret) => {
				delete ret.id;
				return ret;
			},
		},
		toObject: {
			virtuals: true,
			versionKey: false,
			transform: (_, ret) => {
				delete ret.id;
				return ret;
			},
		},
	}
);

//
recipeSchema.post(/^findOne/, async function (doc) {
	if (!doc || !doc.ingredients || doc.nutrients.length > 0) return;
	const res = await fetch(
		`https://api.spoonacular.com/recipes/parseIngredients?apiKey=${process.env.SPOONACULAR_API_KEY}&includeNutrition=true&servings=${doc.totalServings}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: `ingredientList=${encodeURIComponent(doc.ingredients.join("\n"))}`,
		}
	);
	const data = await res.json();

	data.forEach(async (ing) => await doc.nutrients.push(ing));

	await doc.save();
});

//
recipeSchema.set("toJSON", {
	virtuals: true,
	transform: (doc, ret) => {
		if (ret.cuisines && Array.isArray(ret.cuisines)) {
			ret.cuisines = ret.cuisines.map((c) => c.name);
		}
		if (ret.diets && Array.isArray(ret.diets)) {
			ret.diets = ret.diets.map((c) => c.name);
		}

		// remove unwanted fields if needed
		delete ret.__v;
		delete ret.id;

		return ret;
	},
});

//middleware for documents
//this add recipes created by the user
recipeSchema.pre("save", async function (next) {
	if (!this.isNew) return next();
	await User.findByIdAndUpdate(this.createdBy, {
		$addToSet: { createdRecipes: this._id },
	});
	next();
});

//this middleware delete the recipe Id from the user
recipeSchema.post("findOneAndDelete", async function (doc) {
	await User.findByIdAndUpdate(doc.createdBy, {
		$pull: { createdRecipes: doc._id },
	});

	//this will unset the empty array back to undefined
	const updatedUser = await User.findById(doc.createdBy);
	if (updatedUser.createdRecipes.length === 0) {
		await User.findByIdAndUpdate(doc.createdBy, {
			$unset: { createdRecipes: "" },
		});
	}
});
//////////////////

recipeSchema.virtual("reviews", {
	ref: "Review",
	foreignField: "recipe",
	localField: "_id",
});

recipeSchema.pre("save", function (next) {
	this.slug = slugify(this.name, { lower: true });
	next();
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
