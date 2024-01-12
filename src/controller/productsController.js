const productService = require("../services/productService");

createProduct = async (req, res) => {
	const { description, stock_quantity, value, category_id } = req.body;

	try {
		const exist = await productService.verifyCategory(category_id);

		if (exist) {
			const product = productService.createProduct(description, stock_quantity, value, category_id);

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
			const exist = await productService.verifyCategory(category_id);
			if (!exist) return res.status(404).json({ message: "Categoria não encontrada." });
		}

		const productExist = await productService.verifyProduct(id);
		if (!productExist) return res.status(404).json({ messade: "Produto não encontrado em nosso estoque." });

		const product = productService.updateProduct(id, description, stock_quantity, value, category_id);

		return res.status(201).json({ message: "Produto atualizado com sucesso!" });
	} catch (error) {
		return res.status(500).json({ message: "Erro interno no servidor." });
	}
};

showAllProducts = async (req, res) => {
	const { category_id } = req.query;

	try {
		if (!(await productService.verifyCategory(category_id))) return res.status(404).json({ message: "Categoria não encontrada." });

		return res.status(200).json(await productService.showProducts(category_id));
	} catch (error) {
		return res.status(500).json({ message: "Erro interno no servidor." });
	}
};

detailProduct = async (req, res) => {
	const { id } = req.params;

	try {
		if (!(await productService.verifyProduct(id))) return res.status(404).json({ message: "Produto não encontrado." });

		return res.status(200).json(await productService.detailOneProduct(id));
	} catch (error) {
		return res.status(500).json({ message: "Erro interno no servidor." });
	}
};

deleteProduct = async (req, res) => {
	const { id } = req.params;

	try {
		if (!(await productService.verifyProduct(id))) return res.status(404).json({ message: "Produto não encontrado." });

		await productService.deletProductForId(id);

		return res.status(200).json({ message: "Produto excluído com sucesso!" });
	} catch (error) {
		return res.status(500).json({ message: "Erro interno no servidor." });
	}
};

module.exports = { createProduct, updateProduct, showAllProducts, detailProduct, deleteProduct };