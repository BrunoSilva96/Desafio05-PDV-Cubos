const knex = require("../database/conection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passwordHash = require("../../passwordHash");

const login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) return res.status(400).json({ menssagem: "É obrigatório email e senha" });

	try {
		const user = await knex("users").where({ email: email.toLowerCase() }).first();

		if (!user) return res.status(404).json({ message: "Usuário não encontrado." });

		const validPassword = await bcrypt.compare(password, user.password);

		if (!validPassword) return res.status(400).json({ message: "Email ou senha não confere." });

		const userTokenData = {
			id: user.id,
			email: user.email
		};

		const token = jwt.sign(userTokenData, passwordHash, { expiresIn: "24h" });

		const { password: _, ...userData } = user;

		return res.status(200).json({ user: userData, token });
	} catch (error) {}
};

module.exports = { login };
