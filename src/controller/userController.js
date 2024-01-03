const knex = require("../database/conection");

createUser = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const user = await knex("users").insert({ name: name, email: email, password: password }).returning("*");

		return res.status(200).json({ message: "Usuário cadastrado com sucesso!" });
	} catch (error) {
		return res.status(500).json({ message: "Erro interno no servidor." });
	}
};

module.exports = { createUser };
