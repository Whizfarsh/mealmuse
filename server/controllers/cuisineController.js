const Cuisine = require("../models/cuisineModel");
const factory = require("./handlerFactory");

exports.getCuisines = factory.getAll(Cuisine);
exports.getCusine = factory.getOne(Cuisine);
exports.createCusine = factory.createOne(Cuisine);
