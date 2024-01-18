const Joi = require("joi");

const orderSchema = Joi.object({
	client_id: Joi.number().positive().required().messages({
		"any.required": "O campo cliente id da categoria é obrigatório.",
		"number.base": "O cliente id deve ser um número.",
		"number.positive": "O id do cliente do produto deve ser um número positivo."
	}),
	observation: Joi.string().messages({
		"string.base": "O campo observação tem que ser uma string."
	}),
	order_product: Joi.required().messages({
		"any.required": "O campo valor é obrigatório."
	})
});
