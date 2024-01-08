const Joi = require("joi");

const productSchema = Joi.object({
	description: Joi.string().required().messages({
		"any.required": "O campo descrição é obrigatório.",
		"string.empty": "O campo descrição é obrigatório.",
		"string.base": "O campo descrição tem que ser uma string."
	}),
	stock_quantity: Joi.number().required().messages({
		"any.required": "O campo quantidade de estoque é obrigatório."
	}),
	value: Joi.number().required().messages({
		"any.required": "O campo valor é obrigatório.",
		"string.empty": "O campo valor é obrigatório."
	}),
	category_id: Joi.number().required().messages({
		"any.required": "O campo id da categoria é obrigatório."
	})
});

module.exports = { productSchema };
