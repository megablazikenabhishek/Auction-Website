const express = require("express");
const path = require("path");
const router = express.Router();
const nodemailer = require("nodemailer");

router.get("/", async(req, res)=>{
    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
    });

    var mailOptions = {
        from: 'megablazikenabhishek@gmail.com',
        to: 'megablazikenabhishek@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
        html: '<h1> HI </h1>'
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        res.status(505).send("Internal Server Error!!")
        console.log(error);
    } else {
        res.send('Email Sent!')
    }
    });
    // res.json(info);
})

module.exports = router;