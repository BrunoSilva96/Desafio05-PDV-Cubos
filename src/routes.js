const express = require("express");
const category = require("./controller/categoriesController");

const routes = express();

routes.get("/categories", category.listCategories);

module.exports = routes;
