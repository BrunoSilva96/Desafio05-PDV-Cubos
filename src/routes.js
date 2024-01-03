const express = require("express");
const category = require("./controller/categoryController");
const user = require("./controller/userController");

const routes = express();

routes.get("/categories", category.listCategories);

routes.post("/users", user.createUser);

module.exports = routes;
