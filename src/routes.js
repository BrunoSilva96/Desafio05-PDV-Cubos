const express = require("express");
const category = require("./controller/categoryController");
const user = require("./controller/userController");
const login = require("./controller/loginController");
const validates = require("./middleware/validateBodyRequest");
const userSchema = require("./schemas/userSchema");

const routes = express();

routes.get("/categories", category.listCategories);

routes.post("/users", validates(userSchema), user.createUser);

routes.post("/login", login.login);

module.exports = routes;
