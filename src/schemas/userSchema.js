const Joi = require("joi");

const userSchema = Joi.object({
	nome: Joi.string().required(),
	email: Joi.string().email().required(),
	senha: Joi.string().min(5).required()
});

module.exports = userSchema;
