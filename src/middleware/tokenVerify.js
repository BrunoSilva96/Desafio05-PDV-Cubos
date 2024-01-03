const jwt = require("jsonwebtoken");
const knex = require("../database/conection");

const passwordHash = require("../../passwordHash");

verifyToken = async (req, res) => {
	const { authorization } = req.headers;

	if (!authorization) return res.status(401).json({ message: "Não autorizado." });

	const token = authorization.split(" ")[1];

	try {
		const { id } = jwt.verify(token, senhaHash);

		const userExists = await knex("users").where({ id }).first();

		if (!userExists) return res.status(404).json({ message: "Token inválido." });

		const { senha, ...usuario } = userExists;

		req.usuario = usuario;
	} catch (error) {
		return res.status(400).json(error.message);
	}
};
