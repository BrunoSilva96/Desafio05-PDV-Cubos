const knex = require("../database/conection");

createProduct = async (description, stock_quantity, value, category_id, productImage) => {
	try {
		const product = await knex("products").insert({ description, stock_quantity, value, category_id, product_image: productImage });
	} catch (error) {
		return console.log(error.message);
	}
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

updateProduct = async (id, description, stock_quantity, value, category_id) => {
	try {
		const product = await knex("products").where({ id: id }).update({ description, stock_quantity, value, category_id });
	} catch (error) {
		return console.log(error.message);
	}
};

showProducts = async (idCategory) => {
	try {
		if (idCategory) {
			return await knex("products").where({ category_id: idCategory });
		} else {
			return await knex("products").returning("*");
		}
	} catch (error) {
		return console.log(error.message);
	}
};

detailOneProduct = async (idProduct) => {
	try {
		if (verifyProduct(idProduct)) return await knex("products").where({ id: idProduct }).first();
	} catch (error) {
		return console.log(error.message);
	}
};

deletProductForId = async (idProduct) => {
	try {
		if (await knex("order_products").where({ product_id: idProduct })) return true;

		if (verifyProduct(idProduct)) return await knex("products").where({ id: idProduct }).del();
	} catch (error) {
		return console.log(error.message);
	}
};

module.exports = { createProduct, verifyCategory, verifyProduct, updateProduct, showProducts, detailOneProduct, deletProductForId };
