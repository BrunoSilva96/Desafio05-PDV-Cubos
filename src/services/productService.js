const knex = require("../database/conection");

createProductService = async (description, stock_quantity, value, category_id) => {
	const product = await knex("products").insert({ description, stock_quantity, value, category_id });
};

verifyCategory = async (idCategory) => {
	try {
		const category = await knex("categories").where({ id: idCategory });

		return category.length === 1 ? true : false;
	} catch (error) {
		return console.log(error.message);
	}
};

verifyProduct = async (idProduct) => {
	try {
		const product = await knex("products").where({ id: idProduct });

		return product.length === 1 ? true : false;
	} catch (error) {
		return console.log(error.message);
	}
};

updateProductService = async (id, description, stock_quantity, value, category_id) => {
	const product = await knex("products").where({ id: id }).update({ description, stock_quantity, value, category_id });
};

showProducts = async (idCategory) => {
	return await knex("products").returning("*");
};

detailOneProduct = async (idProduct) => {
	if (verifyProduct(idProduct)) return await knex("products").where({ id: idProduct }).first();
};

module.exports = { createProductService, verifyCategory, verifyProduct, updateProductService, showProducts, detailOneProduct };
