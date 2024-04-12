const Razorpay = require('razorpay');

exports.instance = new Razorpay({
  key_id: process.env.REZORPAY_SECRET,
  key_secret: process.env.REZORPAY_ID,
});