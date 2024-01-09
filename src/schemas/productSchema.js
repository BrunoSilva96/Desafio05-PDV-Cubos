const Joi = require("joi");

const productSchema = Joi.object({
	description: Joi.string().required().messages({
		"any.required": "O campo descrição é obrigatório.",
		"string.empty": "O campo descrição é obrigatório.",
		"string.base": "O campo descrição tem que ser uma string."
	}),
	stock_quantity: Joi.number().required().messages({
		"any.required": "O campo quantidade de estoque é obrigatório.",
		"number.base": "A quantidade de estoque deve ser um número."
	}),
	value: Joi.number().required().messages({
		"any.required": "O campo valor é obrigatório.",
		"number.base": "O valor deve ser um número."
	}),
	category_id: Joi.number().required().messages({
		"any.required": "O campo id da categoria é obrigatório.",
		"number.base": "O id deve ser um número."
	})
});

module.exports = { productSchema };
