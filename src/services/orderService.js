const transporter = require("./emailService");
const knex = require("../database/conection");
const { verifyProduct } = require("./productService");

createOrderService = async (client_id, observation, orderProducts) => {
	let totalAmount = 0;
	const summary = [];
	try {
		for (const product of orderProducts) {
			const amount = await knex("products").where({ id: product.product_id }).first("value");

			totalAmount += amount.value;

			summary.push(product);
		}

		const order = await knex("orders").insert({ client_id, observation, amount: totalAmount }).returning("*");

		for (const iterator of orderProducts) {
			const value = await knex("products").where({ id: iterator.product_id }).first("value");

			const summaryOrder = await knex("order_products").insert({ order_id: order[0].id, product_id: iterator.product_id, amount_product: iterator.amount_product, value_product: value.value });
		}

		const client = await knex("clients").where({ id: client_id }).first();

		// transporter.sendMail({
		// 	from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
		// 	to: `${client.name} <${client.email}>`,
		// 	subject: "Resumo da compra.",
		// 	html: `${summary}`
		// });

		return true;
	} catch (error) {
		return console.log(error.message);
	}
};

verifyProductsInOrder = async (products) => {
	try {
		for (const product of products) {
			if (!(await verifyProduct(product.product_id))) {
				return false;
			}
		}
		return true;
	} catch (error) {
		return console.log(error.message);
	}
};

verifyQuantityProducts = async (productId) => {
	try {
		for (const product of productId) {
			const stillInStock = await knex("products").where({ id: product.product_id }).returning("*");

			if (stillInStock[0].stock_quantity < product.amount_product) {
				return false;
			} else {
				const modifyStock = await knex("products")
					.where({ id: product.product_id })
					.update({ stock_quantity: stillInStock[0].stock_quantity - product.amount_product });
			}
		}

		return true;
	} catch (error) {
		return console.log(error.message);
	}
};

validateProduckStock = async () => {};

module.exports = { createOrderService, verifyProductsInOrder, verifyQuantityProducts };
