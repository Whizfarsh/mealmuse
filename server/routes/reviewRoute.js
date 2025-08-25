const express = require("express");

const authController = require("../controllers/authController");
const reviewController = require("../controllers/reviewController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
	.route("/")
	.get(reviewController.getReviews)
	.post(
		authController.restrictTo("user"),
		reviewController.setReviewParams,
		reviewController.createReview
	);

router
	.route("/:id")
	.get(reviewController.getReview)
	.patch(authController.restrictTo("user"), reviewController.updateReview)
	.delete(authController.restrictTo("user"), reviewController.deleteReview);

module.exports = router;
