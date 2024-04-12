const { instance } = require("../config/razorpay");
const Course = require("../modals/Course")


//  payment initiate the Razorpay order
exports.capturePayment = async (req, res) => {
    const { courses } = req.body;
    const userId = req.user.id;

    if (!courses.length === 0) {
        return res.status(500).json({ success: false, message: "please provied course id" })
    }
    let totalPrice = 0
    for (const course_id of courses) {
        console.log(course_id,"this is courseid")
        try {
            let course = await Course.findById(course_id);

            if (!course) {
                return res
                    .status(500)
                    .json({ success: false, message: "Could not find the Course" })
            }

            if (course.studentsEnroled.includes(userId)) {
                return res
                    .status(500)
                    .json({ success: false, message: "Student is already Enrolled" })
            }
            totalPrice += course.price

        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: "could not found course" })
        }
    }

    const options = {
        amount: totalPrice * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
    }
    
    console.log(options,"this is opetions")
    // initiate paymetn
    try {
        const paymentResponse = await instance.orders.create(options)
        console.log(paymentResponse)
        res.json({
            success: true,
            data: paymentResponse,
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false, message: "Could not initiate order."
        })
    }
}