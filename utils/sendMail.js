const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587, // Brevo SMTP port
      secure: false, // false for 587
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: '"Studynotion" <dummyanuj80@gmail.com>', // verified Brevo email
      to: email,
      subject: title,
      html: body,
    });

    console.log("Mail sent:", info);
    return info;
  } catch (error) {
    console.error("Mail send error:", error);
    return error;
  }
};

module.exports = mailSender;
