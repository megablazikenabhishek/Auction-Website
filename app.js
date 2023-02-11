const express = require("express");
const app = express();
const server = require("http").createServer(app)

/*
@middlewares: Basic middlewares
*/
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

//intializing socket
module.exports = server;
require("./config/socket");

/*
@Routes: all the routes are setup all here
*/
app.use("/home",require("./Routes/testing"));


const port = 4200||process.env.PORT;
server.listen(port, ()=>console.log(`Server is listening at port ${port}........`));
