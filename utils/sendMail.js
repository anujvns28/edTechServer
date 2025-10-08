const axios = require("axios");

const mailSender = async (to, subject, html) => {
  try {
    const res = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Studynotion",
          email: "dummyanuj80@gmail.com", // ✅ Verified sender email
        },
        to: [{ email: to }], // Recipient email (dummyanuj80@gmail.com for test)
        subject: subject,
        htmlContent: html,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY, // ✅ Brevo API key
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Mail sent:", res.data);
    console.log("hello");
    return res.data;
  } catch (err) {
    console.error("Mail send error:", err.response?.data || err.message);
    return err;
  }
};

module.exports = mailSender;
