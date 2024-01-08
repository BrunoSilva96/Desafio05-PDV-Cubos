const { verifyCategory, createProductService } = require("../services/productService");

createProduct = async (req, res) => {
	const { description, stock_quantity, value, category_id } = req.body;

	try {
		const exist = await verifyCategory(category_id);

		if (exist) {
			const product = createProductService(description, stock_quantity, value, category_id);

			return res.status(201).json({ message: "Produto cadastrado com sucesso!" });
		}

		return res.status(404).json({ message: "Categoria não encontrada." });
	} catch (error) {
		return res.status(500).json({ message: "Erro interno no servidor." });
	}
};

module.exports = { createProduct };
