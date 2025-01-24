/**
 * @description Cấu hình nodemailer 
*/

// package
const nodemailer = require("nodemailer");

// env
const {
    MAIL_HOST,
    MAIL_PORT,
    MAIL_USERNAME, 
    MAIL_PASSWORD 
} = process.env;

// config
const transporter = nodemailer.createTransport({
    // host: 'gmail.com',
    // port: 587,
    // secure: false, // use false for STARTTLS; true for SSL on port 465
    service: 'gmail',
    auth: {
        user: MAIL_USERNAME,
        pass: MAIL_PASSWORD,
    }
});

module.exports = transporter;