const express = require("express");
const router = express.Router();
const uploader = require("express-fileupload");
const cloudinary = require("../config/cloudinary");
const Item = require("../models/Items");

const getTimeStamp = (s)=>{
    const date = new Date();
    date.setDate(date.getDate()+Number(s));
    return date;
}

router.get("/uploadItem", (req, res)=>{
    res.render("upload");
})

router.post("/uploadItem", uploader({useTempFiles:true}) , async(req, res)=>{
    let product = {
        product_name : req.body.name,
        base_price : req.body.base_price,
        time_stamp: getTimeStamp(req.body.time_stamp),
        location: req.body.location,
        details: req.body.details,
        photos: []
    };

    if(req.files.photos.tempFilePath){
        await cloudinary.uploader.upload(req.files.photos.tempFilePath, (err, result)=>{
            product.photos.push(result.url);
        }).catch(err=>console.log(err))
    }
    else{
        // console.log(req.files.photos)
        for(let j=0; j<req.files.photos.length; j++){
            let i = req.files.photos[j];
            await cloudinary.uploader.upload(i.tempFilePath, (err, result)=>{
                product.photos.push(result.url);
            }).catch(err=>console.log(err))
        }
    }
    console.log(getTimeStamp(req.body.time_stamp));
    Item.create(product)
    require("rimraf")("tmp");
    res.send({msg:"done"});
})

router.post("/testing",uploader({useTempFiles:true}), (req, res)=>{
    console.log(req.files);
    res.redirect("/test1.html");
})
module.exports = router;