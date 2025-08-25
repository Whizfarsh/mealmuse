const express = require("express");
const dietsController = require("../controllers/dietController");

const router = express.Router();

router
	.route("/")
	.get(dietsController.getDiets)
	.post(dietsController.createDiet);

router.route("/:id").get(dietsController.getDiet);

module.exports = router;
