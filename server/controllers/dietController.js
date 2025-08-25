const Diets = require("../models/dietsModel");
const factory = require("./handlerFactory");

exports.getDiets = factory.getAll(Diets);
exports.getDiet = factory.getOne(Diets);
exports.createDiet = factory.createOne(Diets);
