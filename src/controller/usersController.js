const knex = require("../database/conection");
const userService = require("../services/userService");

createUser = async (req, res) => {
	const { name, email, password } = req.body;

	const itsExist = await userService.verifyEmailUser(email);

	if (itsExist) return res.status(400).json({ message: "Email já cadastrado!" });

	try {
		const user = userService.createUser(name, email, password);

		return res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
	} catch (error) {
		return res.status(500).json({ message: "Erro interno no servidor." });
	}
};

showUser = async (req, res) => {
	return res.status(200).json(req.user);
};

updateUser = async (req, res) => {
	const { name, email, password } = req.body;
	const { id } = req.user;

	try {
		if (email) {
			const itsExist = await userService.verifyEmailUser(email, id);

			if (itsExist) return res.status(400).json({ message: "Email já cadastrado!" });
		}

		const user = userService.updateUser(id, name, email, password);

		return res.status(200).json({ message: "Usuário atualizado com sucesso!" });
	} catch (error) {
		return res.status(500).json({ message: "Erro interno no servidor." });
	}
};

module.exports = { createUser, showUser, updateUser };
