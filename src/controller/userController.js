const knex = require("../database/conection");
const { create, verifyEmail } = require("../services/userService");

createUser = async (req, res) => {
	const { name, email, password } = req.body;

	const itsExist = await verifyEmail(email);

	if (itsExist) return res.status(400).json({ message: "Email já cadastrado!" });

	try {
		const user = create(name, email, password);

		return res.status(200).json({ message: "Usuário cadastrado com sucesso!" });
	} catch (error) {
		return res.status(500).json({ message: "Erro interno no servidor." });
	}
};

showUser = async (req, res) => {
	return res.status(200).json(req.user);
};

module.exports = { createUser, showUser };
