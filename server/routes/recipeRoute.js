const express = require("express");
const recipeController = require("../controllers/recipeController");
const authController = require("../controllers/authController");

const reviewRouter = require("./reviewRoute");

const router = express.Router();

router.use("/:recipeId/reviews", reviewRouter);

router
	.route("/")
	.get(recipeController.getAllRecipes)
	.post(
		authController.protect,
		recipeController.setUserParams,
		recipeController.createRecipe
	);

router
	.route("/:id")
	.get(recipeController.getRecipe)
	.patch(authController.protect, recipeController.updateRecipe)
	.delete(
		authController.protect,
		authController.restrictTo("admin", "user"),
		recipeController.deleteRecipe
	);

module.exports = router;
