const nodeMailer = require("nodemailer");
const defaultEmailData = { from: "noreply@my-todo-app.com" };

exports.sendEmail = emailData => {
    const transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GOOGLE_EMAIL,
            pass: process.env.GOOGLE_PASSWORD
        }
    })
    return (
        transporter
            .sendMail(emailData)
            .then(info => console.log(`Message sent: ${info.response}`))
            .catch(err => console.log(`Problem sending email: ${err}`))
    )
}