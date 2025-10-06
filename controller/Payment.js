 const { instance } = require("../config/razorpay");
const Course = require("../modals/Course")
const Crypto = require("crypto");
const User = require("../modals/User");
const mailSender = require("../utils/sendMail");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

//  payment initiate the Razorpay order
exports.capturePayment = async (req, res) => {
  const { courses } = req.body;
  const userId = req.user.id;
  if (!courses.length === 0) {
    return res
      .status(500)
      .json({ success: false, message: "please provied course id" });
  }

  let totalPrice = 0;
  for (const course_id of courses) {
    console.log(course_id, "this is courseid");
    try {
      let course = await Course.findById(course_id);

      if (!course) {
        return res
          .status(500)
          .json({ success: false, message: "Could not find the Course" });
      }

      const isEnrollStudent = new mongoose.Types.ObjectId(userId);

      if (course.studentsEnroled.includes(isEnrollStudent)) {
        return res
          .status(500)
          .json({ success: false, message: "Student is already Enrolled" });
      }
      totalPrice += course.price;
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "could not found course" });
    }
  }

  const currency = "INR";
  const options = {
    amount: totalPrice * 100,
    currency,
    receipt: Math.random(Date.now()).toString(),
  };

  console.log(options, "this is opetions");
  // initiate paymetn
  try {
    const paymentResponse = await instance.orders.create(options);
    console.log(paymentResponse, "this is response");
    res.json({
      success: true,
      data: paymentResponse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Could not initiate order.",
    });
  }
};

//veryfy payment
exports.veryfyPayment = async (req, res) => {
  try {
    const userId = req.user.id;
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;

    console.log("helllo");

    console.log(req.body, "this is req.body");

    const message = razorpay_order_id + "|" + razorpay_payment_id;

    const generated_signature = Crypto.createHmac(
      "sha256",
      process.env.REZORPAY_SECRET
    )
      .update(message)
      .digest("hex");

    if (generated_signature == razorpay_signature) {
      //enroll student
      await enrolledStudent(userId, courses, res);
      return res
        .status(200)
        .json({ success: true, message: "Payment Verified" });
    }

    console.log(message, "this is messsage");
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: "Payment Failed",
    });
  }
};


const enrolledStudent = async(userId,courses,res) => {
    console.log(userId,courses)
    try{
        if (!courses || !userId) {
            return res
              .status(400)
              .json({ success: false, message: "Please Provide Course ID and User ID" })
          } 

    for(const courseId of courses){
     // enroll student in course
     const enrollInCourse = await Course.findByIdAndUpdate(courseId,{
        $push:{
            studentsEnroled:userId
        }
     },{new:true})   

     if(!enrollInCourse) {
        return res
          .status(500)
          .json({ success: false, error: "Course not found" })
    }
    //update user 
    const updateUser = await User.findByIdAndUpdate(userId,{
        $push:{
            courses:courseId
        }
    })

    if(!updateUser) {
        return res
          .status(500)
          .json({ success: false, error: "Course not found" })
    }

    // sendmail
    await mailSender(
        updateUser.email,`Successfully Enrolled into ${enrollInCourse.courseName}`,
        updateUser.firstName
    )

    }

    }catch(error){
        console.log(error,"error occured in enrolling studing")
        res.status(500).json({
            success:false,
            message:"Error occuerd in enrolling studing"
        })
    }
}