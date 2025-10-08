const nodemailer = require("nodemailer")

const mailSender = async (email, title, body) => {
  console.log("mail pass  ", process.env.MAIL_PASS);
  console.log("mail host  ", process.env.MAIL_HOST);
  console.log("mail user  ", process.env.MAIL_USER);

  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      secure: false,
    });

    let info = await transporter.sendMail({
      from: `"Studynotion " <${process.env.MAIL_USER}>`, // sender address
      to: `${email}`, // list of receivers
      subject: `${title}`, // Subject line
      html: `${body}`, // html body
    });

    return info;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
}

module.exports = mailSender
