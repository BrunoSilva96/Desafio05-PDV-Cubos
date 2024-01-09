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

showProducts = async (req, res) => {
	return await knex("products").returning("*");
};

module.exports = { createProductService, verifyCategory, updateProductService, showProducts };
