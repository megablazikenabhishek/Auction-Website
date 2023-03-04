const express = require("express");
const router = express.Router();
const passport = require('passport');
const {genPassword} = require('../lib/passwordUtils');
const User = require("../models/user");

const {isAuth} = require("../middlewares/authorizationMiddleware");

router.get("/login", (req, res)=>{
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/home"
}));

router.post("/signup", async(req, res)=>{
    // console.log(req.body);
    const saltHash = genPassword(req.body.password);
    
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    try {
        await User.findOne({username:req.body.username})
            .then(result=>{
                // console.log(result);
                if(result)
                    res.redirect("/login");
                else    
                    res.status(208).send("already have an account");
            })
    } catch (error) {
        console.log(error);
    }

    // res.redirect('/login');
})
router.get("/logout", (req, res, next)=>{
    req.logout((err)=>{
        if(err)
            return next(err);
        else
            res.redirect('/login');
    });
})
module.exports = router;