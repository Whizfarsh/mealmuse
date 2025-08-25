const mongoose = require("mongoose");

const dietsSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: [true, "Diets name can not be empty"],
	},
	description: String,
	imageUrl: {
		type: String,
		default: "//image-url.jpg",
	},
});

const Diets = mongoose.model("Diets", dietsSchema);
module.exports = Diets;
