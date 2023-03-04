const express = require("express");
const app = express();
const server = require("http").createServer(app);
const session = require("express-session");
const passport = require("passport");
const crypto = require("crypto");
const MongoStore = require("connect-mongo");
require("dotenv").config();

/*
@middlewares: Basic middlewares
*/
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

/**
@middleware: SESSION SETUP
*/
app.use(session({
    secret: "something",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    }),
    cookie:{
        maxAge: 1000*60*60*24
    } 
}));

/**
@middleware: Passport SETUP
*/
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport");

// setting up ejs
app.set("view engine", "ejs");

//intializing socket
module.exports = server;
require("./config/socket");
//intializing cloudinary

/*
@Routes: all the routes are setup all here
*/
app.use("/", require("./routes/landing"));
app.use("/test",require("./routes/testing"));
app.use("/home",require("./routes/home"));


const port = 4200||process.env.PORT;
const start = async()=>{
    try {
        await require("./config/connection")(process.env.MONGO_URI);
        await require("./config/cloudinary");
        server.listen(port, ()=>console.log(`Server is listening at port ${port}........`));
    } catch (error) {
        console.log(error);   
    }
}
start();