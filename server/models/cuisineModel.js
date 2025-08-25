const mongoose = require("mongoose");

const cuisineSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: [true, "Cuisine name can not be empty"],
	},
	description: String,
	imageUrl: {
		type: String,
		default: "//image-url.jpg",
	},
});

const Cuisine = mongoose.model("Cuisine", cuisineSchema);
module.exports = Cuisine;
