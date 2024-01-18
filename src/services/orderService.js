const transporter = require("./emailService");
const knex = require("../database/conection");
const { verifyProduct } = require("./productService");
const { createToken, charge } = require("../stripe");

createOrderService = async (clientId, observation, orderProducts, card) => {
	let totalAmount = 0;
	const summary = [];

	try {
		for (const product of orderProducts) {
			const amount = await knex("products").where({ id: product.product_id }).first("value");

			totalAmount += amount.value * product.amount_product;

			summary.push(product);
		}

		//const tokenCard = await createToken({ card });

		const demand = await charge(totalAmount, "tok_visa");

		const order = await knex("orders").insert({ client_id: clientId, observation, amount: totalAmount, transaction: demand.id }).returning("*");

		for (const iterator of orderProducts) {
			const value = await knex("products").where({ id: iterator.product_id }).first("value");

			const summaryOrder = await knex("order_products").insert({ order_id: order[0].id, product_id: iterator.product_id, amount_product: iterator.amount_product, value_product: value.value });
		}

		const client = await knex("clients").where({ id: clientId }).first();

		transporter.sendMail({
			from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
			to: `${client.name} <${client.email}>`,
			subject: "Confirmação da compra.",
			text: `Compra Realizada com sucesso!`
		});

		return order;
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

showOrderService = async (clientId) => {
	try {
		const summaryOrderProduct = [];

		if (clientId) {
			const orders = await knex("orders").where({ client_id: clientId }).returning("*");

			for (const iterator of orders) {
				const order_product = await knex("order_products").where({ order_id: iterator.id });

				summaryOrderProduct.push(order_product);
			}
			const summary = {
				orders,
				order_product: summaryOrderProduct
			};

			return summary;
		}

		const orders = await knex("orders").select().returning("*");

		for (const iterator of orders) {
			const order_product = await knex("order_products").where({ order_id: iterator.id }).returning("*");

			summaryOrderProduct.push(order_product);
		}

		const summary = {
			orders,
			order_product: summaryOrderProduct
		};

		return summary;
	} catch (error) {
		return console.log(error.message);
	}
};

module.exports = { createOrderService, verifyProductsInOrder, verifyQuantityProducts, showOrderService };
