const express = require("express");
const morgan = require("morgan");
const qs = require("qs");
const cookieParser = require("cookie-parser");

const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");

const globalErrorHandler = require("./controllers/errorController");
const recipeRouter = require("./routes/recipeRoute");
const userRouter = require("./routes/userRoute");
const cuisineRouter = require("./routes/cuisinesRoute");
const dietsRouter = require("./routes/dietsRoute");
const reviewsRouter = require("./routes/reviewRoute");

const AppError = require("./utils/appError");

const app = express();

// Security HTTP headers
app.use(helmet());

// Logger
app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

// Rate limiting
const limiter = rateLimit({
	max: 1000,
	windowMs: 60 * 60 * 1000, // 1 hour
	message: "Too many requests from this IP, please try again in an hour",
});
app.use("/api", limiter);

// Body parser
app.use(express.json({ limit: "10kb" }));

// Data sanitization against NoSQL query injection
app.use((req, res, next) => {
	if (req.body) req.body = mongoSanitize.sanitize(req.body);
	if (req.query) req.query = { ...mongoSanitize.sanitize(req.query) }; // spread to avoid setter
	if (req.params) req.params = mongoSanitize.sanitize(req.params);
	next();
});

// Query parser
app.set("query parser", (str) => qs.parse(str));

// Routes
app.use("/api/v1/recipes", recipeRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/cuisines", cuisineRouter);
app.use("/api/v1/diets", dietsRouter);
app.use("/api/v1/reviews", reviewsRouter);

// 404 handler
app.all("/{*any}", (req, res, next) => {
	next(
		new AppError(`Can't find inputed ${req.originalUrl} on this server!`, 404)
	);
});

// Global error handler
app.use(globalErrorHandler);

module.exports = app;
