const Joi = require("joi");

const productSchema = Joi.object({
	description: Joi.string().required().messages({
		"any.required": "O campo descrição é obrigatório.",
		"string.empty": "O campo descrição é obrigatório.",
		"string.base": "O campo descrição tem que ser uma string."
	}),
	stock_quantity: Joi.number().positive().required().messages({
		"any.required": "O campo quantidade de estoque é obrigatório.",
		"number.base": "A quantidade de estoque deve ser um número.",
		"number.positive": "A quantidade de estoque deve ser um número positivo."
	}),
	value: Joi.number().positive().required().messages({
		"any.required": "O campo valor é obrigatório.",
		"number.base": "O valor deve ser um número.",
		"number.positive": "O valor do produto deve ser um número positivo."
	}),
	category_id: Joi.number().positive().required().messages({
		"any.required": "O campo id da categoria é obrigatório.",
		"number.base": "O id deve ser um número.",
		"number.positive": "A categoria do produto deve ser um número positivo."
	})
});

const UpdateProductSchema = Joi.object({
	description: Joi.string().messages({
		"string.base": "O campo descrição tem que ser uma string."
	}),
	stock_quantity: Joi.number().positive().messages({
		"number.base": "A quantidade de estoque deve ser um número.",
		"number.positive": "A quantidade de estoque deve ser um número positivo."
	}),
	value: Joi.number().positive().messages({
		"number.base": "O valor deve ser um número.",
		"number.positive": "O valor do produto deve ser um número positivo."
	}),
	category_id: Joi.number().positive().messages({
		"number.base": "O id deve ser um número.",
		"number.positive": "A categoria do produto deve ser um número positivo."
	})
});

module.exports = { productSchema, UpdateProductSchema };
