const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    secure: true,
    auth: {
        user: 'importano0@gmail.com',
        pass: 'nzvo sqeg xiaq udgf '
    }
});

transporter.verify()
.then(() => console.log("Mail enviado con exito"))
.catch((err) => console.error(err));
module.exports = transporter;