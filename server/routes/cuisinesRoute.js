const express = require("express");
const cuisineController = require("../controllers/cuisineController");

const router = express.Router();

router
	.route("/")
	.get(cuisineController.getCuisines)
	.post(cuisineController.createCusine);

router.route("/:id").get(cuisineController.getCusine);

module.exports = router;
