const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });
const Recipe = require("../server/models/recipesModel");

const DB = process.env.DATABASE.replace(
	"<PASSWORD>",
	process.env.DATABASE_PASSWORD
);

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("DB connection successful!"));

const recipeData = fs.readFileSync(`${__dirname}/recipe-data.json`, "utf-8");
const recipes = JSON.parse(recipeData);

const importData = async () => {
	try {
		await Recipe.create(recipes, { validateBeforeSave: false });
		console.log("Data successfully loaded!");
	} catch (err) {
		console.log(err);
	}
	process.exit();
};

const deleteData = async () => {
	try {
		await Recipe.deleteMany();
		console.log("Data successfully deleted!");
	} catch (err) {
		console.log(err);
	}
	process.exit();
};

// console.log(process.argv);

if (process.argv[2] === "--import") {
	importData();
}
if (process.argv[2] === "--delete") {
	deleteData();
}
