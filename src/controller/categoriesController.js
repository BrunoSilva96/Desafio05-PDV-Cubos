const knex = require("../database/conection");

listCategories = async (req, res) => {
	try {
		const categories = await knex("categories").select("description");

		return res.status(200).json(categories);
	} catch (error) {
		return res.status(500).json({ message: "Erro interno no servidor." });
	}
};

module.exports = { listCategories };
