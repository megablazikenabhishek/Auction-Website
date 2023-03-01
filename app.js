const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app)
require("dotenv").config();

/*
@middlewares: Basic middlewares
*/
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// setting up ejs
app.set("view engine", "ejs");

//intializing socket
module.exports = server;
require("./config/socket");
//intializing cloudinary

/*
@Routes: all the routes are setup all here
*/
app.use("/test",require("./Routes/testing"));


const port = 4200||process.env.PORT;
const start = async()=>{
    try {
        await require("./config/connection")(process.env.MOGO_URI);
        await require("./config/cloudinary");
        server.listen(port, ()=>console.log(`Server is listening at port ${port}........`));
    } catch (error) {
        console.log(error);   
    }
}
start();