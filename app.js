const express = require("express");
const app = express();

/*
    @middlewares: Basic required for all apps
*/
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

/*
    @Routes: all the routes are setup all here
 */
app.get("/api/v1/home", (req, res)=>{
    console.log("Hello World");
    res.status(200).send("hiiiiii");
})

const port = 4200||process.env.PORT;
app.listen(port, ()=>console.log(`Server is listening at port ${port}........`));