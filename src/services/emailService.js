const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	host: "sandbox.smtp.mailtrap.io",
	port: 2525,
	auth: {
		user: "a281ed1effc6ec",
		pass: "2c1f22e775eae1"
	}
});

module.exports = transporter;
