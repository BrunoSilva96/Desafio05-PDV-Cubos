const express = require("express");
const category = require("./controller/categoriesController");
const login = require("./controller/loginController");
const product = require("./controller/productsController");
const user = require("./controller/usersController");
const client = require("./controller/clientsController");
const validates = require("./middleware/validateBodyRequest");
const userSchemaValidate = require("./schemas/userSchema");
const productSchemaValidate = require("./schemas/productSchema");
const clientSchemaValidate = require("./schemas/clientSchema");
const { verifyToken } = require("./middleware/tokenVerify");

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
routes.delete("/product/:id", product.deleteProduct);

routes.post("/client", validates(clientSchemaValidate.clientSchema), client.createClient);
routes.put("/client/:id", validates(clientSchemaValidate.clientUpdateSchema), client.updateClient);
routes.get("/client", client.showAllClients);

module.exports = routes;
