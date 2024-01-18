const knex = require("../database/conection");
const { validateCpf, verifyEmailClients, createClients, verifyCpfClients, clientExist } = require("../services/clientService");

const createClient = async (req, res) => {
	const { name, email, cpf } = req.body;

	try {
		if (!(await validateCpf(cpf)) || (await verifyCpfClients(cpf))) return res.status(400).json({ message: "CPF inválido ou já cadastrado em nosso sistema." });

		if (await verifyEmailClients(email)) return res.status(400).json({ message: "Email já cadastrado em nosso sistema." });

		const client = await createClients(name, email, cpf);

		return res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
	} catch (error) {
		return res.status(500).json({ message: "Erro interno no servidor." });
	}
};

const updateClient = async (req, res) => {
	const { id } = req.params;
	const { name, email, cpf } = req.body;

	try {
		if (!(await clientExist(id))) return res.status(404).json({ message: "Usuário não existe em nosso sistema." });

		if (cpf) {
			if (!(await validateCpf(cpf)) || (await verifyCpfClients(cpf))) return res.status(400).json({ message: "CPF inválido ou já cadastrado em nosso sistema." });

			const client = await updateClient(name, email, cpf, id);
		}

		if (await verifyEmailClients(email, id)) return res.status(400).json({ message: "Email já cadastrado em nosso sistema." });

		const client = await updateClients(id, name, email);

		return res.status(200).json({ message: "Usuário atualizado com sucesso!" });
	} catch (error) {
		return res.status(500).json({ message: "Erro interno no servidor." });
	}
};

const showAllClients = async (req, res) => {
	try {
		return res.status(200).json(await knex("clients").returning("*"));
	} catch (error) {
		return res.status(500).json({ message: "Erro interno no servidor." });
	}
};

const showOneClient = async (req, res) => {
	const { id } = req.params;
	try {
		if (!(await clientExist(id))) return res.status(404).json({ message: "Usuário não existe em nosso sistema." });

		return res.status(200).json(await knex("clients").where({ id: id }).first());
	} catch (error) {
		return res.status(500).json({ message: "Erro interno no servidor." });
	}
};

module.exports = { createClient, updateClient, showAllClients, showOneClient };
