const knex = require("../database/conection");
const { deleteFile } = require("./storageService");

const createProduct = async (description, stock_quantity, value, category_id, productImage) => {
	try {
		const product = await knex("products").insert({ description, stock_quantity, value, category_id, product_image: productImage });
	} catch (error) {
		return console.log(error.message);
	}
};

const verifyCategory = async (idCategory) => {
	try {
		const category = await knex("categories").where({ id: idCategory });

		return category.length === 1 ? true : false;
	} catch (error) {
		return console.log(error.message);
	}
};

const verifyProduct = async (idProduct) => {
	try {
		const product = await knex("products").where({ id: idProduct });

		return product.length === 1 ? true : false;
	} catch (error) {
		return console.log(error.message);
	}
};

const updateProduct = async (id, description, stock_quantity, value, category_id) => {
	try {
		const product = await knex("products").where({ id: id }).update({ description, stock_quantity, value, category_id });
	} catch (error) {
		return console.log(error.message);
	}
};

const showProducts = async (idCategory) => {
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

const detailOneProduct = async (idProduct) => {
	try {
		if (verifyProduct(idProduct)) return await knex("products").where({ id: idProduct }).first();
	} catch (error) {
		return console.log(error.message);
	}
};

const verifyProductDescription = async (descriptionProduct) => {
	try {
		const registeredProduct = await knex("products").where("description", "ilike", `%${descriptionProduct}%`);

		if (registeredProduct.length > 0) return true;
	} catch (error) {
		return console.log(error.message);
	}
};

const deletProductForId = async (idProduct) => {
	try {
		const productInOrder = await knex("order_products").where({ product_id: idProduct });
		if (productInOrder.length > 0) return false;

		const image = await knex("products").where({ id: idProduct }).first();
		if (image.product_image !== null) deleteFile(image.product_image);

		return await knex("products").where({ id: idProduct }).del();
	} catch (error) {
		return console.log(error.message);
	}
};

module.exports = { createProduct, verifyCategory, verifyProduct, updateProduct, showProducts, detailOneProduct, deletProductForId, verifyProductDescription };
