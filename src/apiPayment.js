const axios = require("axios");

const instanceAxios = axios.create({
	baseURL: "https://api.stripe.com/v1",
	headers: {
		authorization: `Bearer ${process.env.API_KEY_STRIPE}`,
		"Content-type": "application/x-www-form-urlencoded"
	}
});

module.exports = instanceAxios;
