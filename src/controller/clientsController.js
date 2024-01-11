const knex = require("../database/conection");
const { validateCpf, verifyEmailClients, createClients, verifyCpfClients } = require("../services/clientService");

createClient = async (req, res) => {
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

module.exports = { createClient };
