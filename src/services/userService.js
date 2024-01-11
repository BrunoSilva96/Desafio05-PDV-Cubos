const knex = require("../database/conection");
const bcrypt = require("bcrypt");

createUser = async (name, email, password) => {
	const encryptedPassword = await bcrypt.hash(password, 10);

	const user = await knex("users").insert({ name: name, email: email.toLowerCase(), password: encryptedPassword }).returning("*");
};

updateUser = async (id, name, email, password) => {
	try {
		if (password) {
			const encryptedPassword = await bcrypt.hash(password, 10);

			const user = await knex("users").where({ id: id }).update({ name, email, password: encryptedPassword }).returning("*");
		}

		const user = await knex("users").where({ id: id }).update({ name, email });
	} catch (error) {
		return console.log(error.message);
	}
};

verifyEmailUser = async (email, id) => {
	try {
		if (id) {
			const emailExist = await knex("users").where({ id });

			if (emailExist[0].email === email) return false;
		}

		const emailExist = await knex("users").where({ email: email.toLowerCase() });

		if (emailExist.length > 0) return true;
	} catch (error) {
		return console.log(error.message);
	}
};

module.exports = { createUser, verifyEmailUser, updateUser };
