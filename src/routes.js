const express = require("express");
const category = require("./controller/categoryController");
const user = require("./controller/userController");
const login = require("./controller/loginController");
const validates = require("./middleware/validateBodyRequest");
const userSchemaValidate = require("./schemas/userSchema");
const { verifyToken } = require("./middleware/tokenVerify");
const product = require("./controller/productController");
const productSchemaValidate = require("./schemas/productSchema");

const routes = express();

routes.get("/categories", category.listCategories);

routes.post("/users", validates(userSchemaValidate.userSchema), user.createUser);

routes.post("/login", login.login);

routes.use(verifyToken);

routes.get("/user", user.showUser);
routes.put("/user", validates(userSchemaValidate.userUpdateSchema), user.updateUser);

routes.post("/product", validates(productSchemaValidate.productSchema), product.createProduct);
routes.put("/product/:id", validates(productSchemaValidate.UpdateProductSchema), product.updateProduct);
routes.get("/products", product.showAllProducts);
routes.get("/product/:id", product.detailProduct);

module.exports = routes;
