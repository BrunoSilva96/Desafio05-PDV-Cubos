const Joi = require("joi");

const clientSchema = Joi.object({
	name: Joi.string().required().messages({
		"any.required": "O campo nome é obrigatório.",
		"string.empty": "O campo nome é obrigatório.",
		"string.base": "O campo nome tem que ser uma string."
	}),
	email: Joi.string().email().required().messages({
		"any.required": "O campo e-mail é obrigatório.",
		"string.email": "O campo e-mail deve conter um formato válido."
	}),
	cpf: Joi.string().messages({
		"any.required": "O campo cpf é obrigatório.",
		"string.empty": "O campo cpf é obrigatório."
	})
});

const clientUpdateSchema = Joi.object({
	name: Joi.string().messages({
		"string.base": "O campo nome tem que ser uma string."
	}),
	email: Joi.string().email().messages({
		"string.email": "O campo e-mail deve conter um formato válido."
	}),
	cpf: Joi.string().messages({
		"string.empty": "O campo cpf é não pode ser em branco."
	})
});

module.exports = { clientSchema, clientUpdateSchema };
