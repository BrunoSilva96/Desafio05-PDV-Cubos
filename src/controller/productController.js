const { verifyCategory, createProductService, updateProductService, showProducts, verifyProduct } = require("../services/productService");

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

updateProduct = async (req, res) => {
	const { id } = req.params;
	const { description, stock_quantity, value, category_id } = req.body;

	try {
		if (category_id) {
			const exist = await verifyCategory(category_id);
			if (!exist) return res.status(404).json({ message: "Categoria não encontrada." });
		}

		const productExist = await verifyProduct(id);
		if (!productExist) return res.status(404).json({ messade: "Produto não encontrado em nosso estoque." });

		const product = updateProductService(id, description, stock_quantity, value, category_id);

		return res.status(201).json({ message: "Produto atualizado com sucesso!" });
	} catch (error) {
		return res.status(500).json({ message: "Erro interno no servidor." });
	}
};

showAllProducts = async (req, res) => {
	try {
		return res.status(200).json(await showProducts());
	} catch (error) {
		return res.status(500).json({ message: "Erro interno no servidor." });
	}
};

detailProduct = async (req, res) => {
	const { id } = req.params;
	try {
		if (!(await verifyProduct(id))) return res.status(404).json({ message: "Produto não encontrado." });

		return res.status(200).json(await detailOneProduct(id));
	} catch (error) {
		return res.status(500).json({ message: "Erro interno no servidor." });
	}
};

module.exports = { createProduct, updateProduct, showAllProducts, detailProduct };
