const express = require("express");
const path = require("path");
const router = express.Router();
const nodemailer = require("nodemailer");

router.get("/", async(req, res)=>{
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: 'kelley.dietrich@ethereal.email',
            pass: '1Z4vQJ9XD8UfXbvzUd'
        },
    });

    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <hii@gmail.com>', // sender address
        to: "megablazikenabhishek@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    res.send("hiii");
})

module.exports = router;