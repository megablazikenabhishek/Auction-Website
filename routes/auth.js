const express = require("express");
const Token = require("../models/token");
const router = express.Router();
const nodemailer = require("nodemailer");
const crypto = require("crypto");

router.post("/", async (req, res) => {
  var transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {user : process.env.EMAIL, pass : process.env.PASS}
  });
  try {
    var token = crypto.randomBytes(32).toString('hex');
    const obj = await Token.create({
      name : req.body.name,
      username : req.body.username,
      email : req.body.email,
      token,
      password : req.body.password
    });
    let mailOptions = {
      from : process.env.EMAIL,
      to : req.body.email,
      subject : 'Verification Email',
      text : `Click on the url to verify your account ${
          process.env.HOST}/auth/${obj._id}/verify/${token}`,
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        res.status(505).send("Internal Server Error!!")
        console.log(error);
      } else {
        res.render("verify", {
          msg : "Email has been sennt!!!",
          body : "Click on the link sent at your email to verify"
        })
      }
    });
  } catch (error) {
    res.send("Internal Server Error......");
    console.log(error);
  }
})

router.get("/:id/verify/:token", async (req, res) => {
  // console.log(req.params);
  const {id, token} = req.params;
  try {
    const obj = await Token.findById(id);
    if (!obj || obj.token !== token) {
      res.status(400).send("Invalid");
      return;
    }
    // console.log(obj);
    var request = require('request');
    request.post(`${process.env.HOST}/signup`, {
      json : {
        name : obj.name,
        username : obj.username,
        email : obj.email,
        password : obj.password
      }
    },
                 function(error, response, body) {
                   // console.log(response.statusCode);
                   if (!error && response.statusCode == 302) {
                     Token.findByIdAndDelete(obj._id).catch(
                         err => console.log(err))
                     res.render("verify", {
                       msg : "Congratulations!!!",
                       body : "You have been Verified. Well done!!"
                     })
                   } else
                     res.send("Internal Server Error......");
                 });
  } catch (error) {
    res.send("Internal Server Error......");
    console.log(error);
  }
})
module.exports = router;
