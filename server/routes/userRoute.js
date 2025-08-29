const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.route("/me").get(authController.protect, userController.getMe);

router.patch(
	"/updateMyPassword",
	authController.protect,
	authController.updateMyPassword
);
router.patch(
	"/updateMyProfile",
	authController.protect,
	userController.updateMyProfile
);
router.delete(
	"/deleteMyProfile",
	authController.protect,
	userController.deleteMyProfile
);

router
	.route("/")
	.get(userController.getAllUsers)
	.post(userController.createUser);

router
	.route("/savedRecipes")
	.get(authController.protect, userController.userSavedRecipes)
	.patch(authController.protect, userController.saveRecipe);

router
	.route("/:id")
	.get(userController.getUser)
	.patch(userController.updateUser)
	.delete(userController.deleteUser);

module.exports = router;
