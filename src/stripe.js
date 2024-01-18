const instanceAxios = require("./apiPayment");
const qs = require("qs");

const createToken = async (card) => {
	const dataCard = qs.stringify(card);

	const { data: tokenCard } = await instanceAxios.post("/tokens", dataCard);

	return tokenCard;
};

const charge = async (amount, tokenCard) => {
	const dataDemand = qs.stringify({
		amount,
		currency: "brl",
		source: tokenCard
	});

	const { data: demand } = await instanceAxios.post("/charges", dataDemand);

	return demand;
};

module.exports = {
	createToken,
	charge
};
