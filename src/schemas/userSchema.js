const Joi = require("joi");

const userSchema = Joi.object({
	nome: Joi.string().required().messages({
		"any.required": "O campo senha é obrigatório.",
		"string.base": "O campo nome tem que ser uma string."
	}),
	email: Joi.string().email().required().messages({
		"any.required": "O campo senha é obrigatório.",
		"string.email": "O campo eemail deve conter um formato válido."
	}),
	senha: Joi.string().min(5).required().messages({
		"any.required": "O campo senha é obrigatório.",
		"string.min": "A senha deve conter, no mínimo 5 caracteres."
	})
});

module.exports = userSchema;
