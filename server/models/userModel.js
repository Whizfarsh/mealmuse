const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		Required: [true, "You need to input a name"],
		minLength: [5, "Your name must be more than 5 characters"],
	},
	email: {
		type: String,
		required: [true, "An email is required"],
		validate: [validator.isEmail, "Please insert correct email"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "You have to set your password"],
		minLength: [8, "password ca not be less than 8 characters"],
		select: false,
	},
	passwordConfirm: {
		type: String,
		required: [true, "This have to match with the password"],
		validate: {
			validator: function (el) {
				return el === this.password;
			},
			message: "Password does not match",
		},
	},
	photo: String,
	userRole: {
		type: String,
		enum: ["user", "admin", "chef", "moderator"],
		default: "user",
	},
	savedRecipe: {
		type: [mongoose.Schema.ObjectId],
		ref: "Recipe",
		default: undefined,
	},
	createdRecipes: {
		type: [mongoose.Schema.ObjectId],
		ref: "Recipe",
		default: undefined,
	},
	isActive: {
		type: Boolean,
		default: true,
	},
	passwordChangedAt: Date,
	passwordResetToken: String,
	passwordResetExpires: Date,
});

//MIDDLEWARE TO DECRYPT PASSWORD ON CREATE
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 12);
	this.passwordConfirm = undefined;

	next();
});

//MIDDLEWARE TO SAVE PASSWORDCHANGEDAT
userSchema.pre("save", function (next) {
	if (this.isModified("password") || this.isNew) return next();

	this.passwordChangedAt = Date.now() - 1000;
	next();
});

//MIDDLEWARE TO REMOVE IN ACTIVE ACCOUNTS FROM QUERY
userSchema.pre(/^find/, function (next) {
	this.find({ isActive: { $ne: false } });

	next();
});

//MIDDLEWARE TO CONFIRM PASSWORD
userSchema.methods.correctPassword = async function (
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

//MIDDLEWARE TO SEE IF PASSWORD IS CHANGED
userSchema.methods.changedPasswordAfter = function (JWTimestamp) {
	if (this.passwordChangedAt) {
		const updatedTime = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

		// console.log(updatedTime, JWTimestamp);
		return JWTimestamp < updatedTime;
	}
	return false;
};

//middleware to generate password reset token
userSchema.methods.getResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString("hex");

	this.passwordResetToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");
	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

	return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
