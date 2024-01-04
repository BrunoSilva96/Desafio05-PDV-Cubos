const Joi = require("joi");

const userSchema = Joi.object({
	name: Joi.string().required().messages({
		"any.required": "O campo nome é obrigatório.",
		"string.empty": "O campo nome é obrigatório.",
		"string.base": "O campo nome tem que ser uma string."
	}),
	email: Joi.string().email().required().messages({
		"any.required": "O campo e-mail é obrigatório.",
		"string.email": "O campo e-mail deve conter um formato válido."
	}),
	password: Joi.string().min(5).required().messages({
		"any.required": "O campo senha é obrigatório.",
		"string.empty": "O campo senha é obrigatório.",
		"string.min": "A senha deve conter, no mínimo 5 caracteres."
	})
});

module.exports = userSchema;
