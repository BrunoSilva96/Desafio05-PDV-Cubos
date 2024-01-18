const jwt = require("jsonwebtoken");
const knex = require("../database/conection");

const passwordHash = require("../../passwordHash");

const verifyToken = async (req, res, next) => {
	const { authorization } = req.headers;

	if (!authorization) return res.status(401).json({ message: "Não autorizado." });

	const token = authorization.split(" ")[1];

	try {
		const { id } = jwt.verify(token, passwordHash);

		const userExists = await knex("users").where({ id }).first();

		if (!userExists) return res.status(404).json({ message: "Token inválido." });

		const { senha, ...user } = userExists;

		req.user = user;

		next();
	} catch (error) {
		return res.status(400).json(error.message);
	}
};

module.exports = { verifyToken };
