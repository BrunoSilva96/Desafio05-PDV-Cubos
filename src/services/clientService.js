const knex = require("../database/conection");
const { CPF, CNPJ } = require("@julioakira/cpf-cnpj-utils");

const clientExist = async (id) => {
	try {
		const client = await knex("clients").where({ id: id }).first();

		return client.id > 0 ? true : false;
	} catch (error) {
		return console.log(error.message);
	}
};

const validateCpf = async (cpfClient) => {
	try {
		return CPF.Validate(cpfClient) ? true : false;
	} catch (error) {
		return console.log(error.message);
	}
};

const verifyCpfClients = async (cpf, id) => {
	try {
		if (id) {
			const cpfExist = await knex("clients").where({ id });

			if (cpfExist[0].cpf === cpf) return false;
		}

		const cpfExist = await knex("clients").where({ cpf: CPF.Format(cpf) });

		if (cpfExist.length > 0) return true;
	} catch (error) {
		return console.log(error.message);
	}
};

const verifyEmailClients = async (email, id) => {
	try {
		if (id) {
			const emailExist = await knex("clients").where({ id });

			if (emailExist[0].email === email) return false;
		}

		const emailExist = await knex("clients").where({ email: email.toLowerCase() });

		if (emailExist.length > 0) return true;
	} catch (error) {
		return console.log(error.message);
	}
};

const createClients = async (name, email, cpf) => {
	try {
		const client = knex("clients").insert({ name, email: email.toLowerCase(), cpf: CPF.Format(cpf) });

		return client;
	} catch (error) {
		return console.log(error.message);
	}
};

const updateClients = async (id, name, email, cpf) => {
	try {
		if (cpf) {
			const cpfFormated = CPF.Format(cpf);
			const client = knex("clients").update({ name, email: email.toLowerCase(), cpf: cpfFormated }).where({ id });
		}
		const client = knex("clients").update({ name, email: email.toLowerCase() }).where({ id });

		return client;
	} catch (error) {
		return console.log(error.message);
	}
};

module.exports = { validateCpf, verifyEmailClients, createClients, verifyCpfClients, updateClients, clientExist };
