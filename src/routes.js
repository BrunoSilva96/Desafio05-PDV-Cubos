const express = require("express");
const category = require("./controller/categoryController");
const user = require("./controller/userController");
const login = require("./controller/loginController");

const routes = express();

routes.get("/categories", category.listCategories);

routes.post("/users", user.createUser);

routes.post("/login", login.login);

module.exports = routes;
