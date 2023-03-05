const express = require("express");
const router = express.Router();
const passport = require('passport');
const { genPassword } = require('../lib/passwordUtils');
const User = require("../models/user");

const { isAuth } = require("../middlewares/authorizationMiddleware");

router.get("/", (req, res) => {
    res.render("landing");
})

router.get("/login", (req, res) => {
    // console.log(req.isAuthenticated());
    if (req.isAuthenticated())
        res.redirect("/home");
    else
        res.render("login");
});

router.post("/login", passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/home"
}));

router.post("/signup", async (req, res) => {
    console.log(req.body);
    const saltHash = genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        hash: hash,
        salt: salt,
        admin: false
    });

    newUser.save()
        .then((user) => {
            console.log(user);
        })
        .catch(err=>console.log(err));

    res.redirect('/login');
})
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err)
            return next(err);
        else
            res.redirect('/login');
    });
})
module.exports = router;