const express = require("express");
const path = require("path");
const router = express.Router();
const uploader = require("express-fileupload");
const cloudinary = require("../config/cloudinary");
// const 

router.get("/room1", (req, res)=>{
    res.sendFile(path.join(__dirname, "../public/test1.html"));
})

router.get("/room2", (req, res)=>{
    res.sendFile(path.join(__dirname, "../public/test2.html"));
})

router.get("/ejs", (req, res)=>{
    res.render("index", {name:"Abhii", array:[1, 2, 3, 4]});
})

router.post("/upload", uploader({useTempFiles:true}),  async(req, res)=>{
    console.log(req.files.images);
    await cloudinary.uploader.upload(req.files.images.tempFilePath, (err, result)=>{
        console.log(result);
    }).catch(err=>console.log(err))
    
    res.send("done");
    require("rimraf")("tmp");
})


//mine
router.get("/item",async(req,res)=> {
    const obj = await fetchData();
    res.render('/item',{ obj });
});

function fetchData() {
    return fetch("").then(res => res.json());
}
module.exports = router;