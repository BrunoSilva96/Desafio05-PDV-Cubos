const knex = require("../database/conection");

createProductService = async (description, stock_quantity, value, category_id) => {
	const product = await knex("products").insert({ description, stock_quantity, value, category_id });
};

verifyCategory = async (idCategory) => {
	try {
		const category = await knex("categories").where({ id: idCategory });

		if (category.length === 1) return true;
	} catch (error) {
		return console.log(error.message);
	}
};

module.exports = { createProductService, verifyCategory };
