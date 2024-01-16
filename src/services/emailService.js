const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	host: env.process.EMAIL_HOST,
	port: 2525,
	auth: {
		user: env.process.EMAIL_USER,
		pass: env.process.EMAIL_PASS
	}
});

module.exports = transporter;
