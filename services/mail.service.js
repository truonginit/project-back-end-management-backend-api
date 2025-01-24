// config
const transporter = require('../config/mail.config');

// env
const {
    MAIL_USERNAME, 
} = process.env;

// service
class MailService {

    /**
     * @description Gửi mail cho 1 người nhận 
    */
    static sendToOneRecipient = async ({ toEmail, subject, content }) => {
        // cấu hình object mail options
        const mailOptions = {
            from: MAIL_USERNAME,
            to:   toEmail,          // gửi đến email
            subject: subject,
            html: '<h1>Welcome</h1><p>That was easy!</p>'
        }

        // Send email
        return await transporter.sendMail(mailOptions);
    }
}

// exports
module.exports = MailService;