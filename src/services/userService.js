const knex = require("../database/conection");
const bcrypt = require("bcrypt");

create = async (name, email, password) => {
	const encryptedPassword = await bcrypt.hash(password, 10);

	const user = await knex("users").insert({ name: name, email: email.toLowerCase(), password: encryptedPassword }).returning("*");
};

verifyEmail = async (email) => {
	const emailExist = await knex("users").where({ email: email.toLowerCase() });

	if (emailExist.length > 0) return true;
};

module.exports = { create, verifyEmail };
