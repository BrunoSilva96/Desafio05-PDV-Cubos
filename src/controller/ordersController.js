const { clientExist } = require("../services/clientService");
const { createOrderService, verifyProductsInOrder, verifyQuantityProducts, showOrderService } = require("../services/orderService");

createOrder = async (req, res) => {
	const { client_id, observation, order_products } = req.body;

	try {
		if (!(await clientExist(client_id))) return res.status(404).json({ message: "Cliente não encontrado em nosso banco de dados." });

		if (!(await verifyProductsInOrder(order_products))) return res.status(404).json({ message: "Produto não encontrado em nosso estoque." });

		if (!(await verifyQuantityProducts(order_products))) return res.status(401).json({ message: "Quantidade em estoque insuficiente." });

		const order = await createOrderService(client_id, observation, order_products);

		return res.status(200).json({ message: "Compra concluída com sucesso. Um email será enviado com o resumo da compra." });
	} catch (error) {
		return res.status(500).json({ message: "Erro interno no servidor." });
	}
};

showOrder = async (req, res) => {
	const { client_id } = req.query;

	try {
		if (!(await clientExist(client_id)) && client_id != undefined) return res.status(404).json({ message: "Cliente não encontrado em nosso banco de dados." });

		return res.status(200).json(await showOrderService(client_id));
	} catch (error) {
		return res.status(500).json({ message: "Erro interno no servidor." });
	}
};

module.exports = { createOrder, showOrder };
