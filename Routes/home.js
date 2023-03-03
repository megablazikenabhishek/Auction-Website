const express = require("express");
const router = express.Router();
const uploader = require("express-fileupload");
const cloudinary = require("../config/cloudinary");
const Item = require("../models/Items");
const path = require("path");

const getTimeStamp = (s)=>{
    var date = new Date();
    date.setDate(date.getDate() + Number(s));
    return date;
}

router.get("/uploadItem", (req, res)=>{
    res.render("upload");
})

router.get("/", (req, res)=>{
    res.render("home");
})

router.post("/uploadItem", uploader({useTempFiles:true}) , async(req, res)=>{
    let product = {
        product_name : req.body.name,
        base_price : req.body.base_price,
        prev_bid: req.body.base_price,
        time_stamp: getTimeStamp(req.body.time_stamp),
        location: req.body.location,
        details: req.body.details,
        photos: []
    };

    try{
        if(req.files.photos.tempFilePath){
            await cloudinary.uploader.upload(req.files.photos.tempFilePath, (err, result)=>{
                product.photos.push(result.url);
            }).catch(err=>console.log(err))
        }
        else{
            for(let j=0; j<req.files.photos.length; j++){
                let i = req.files.photos[j];
                await cloudinary.uploader.upload(i.tempFilePath, (err, result)=>{
                    product.photos.push(result.url);
                }).catch(err=>console.log(err))
            }
        }
        Item.create(product)
            // .then(res=>console.log(res))
            .catch(err=>console.log(err))

        require("rimraf")("tmp");
        res.send({msg:"done"});
    }catch(err){
        res.status(500).send({msg:"error"})
        console.log(err);
    }
})

router.get("/getItems", async(req, res)=>{
    try{
        let result = await Item.find({sold:false})
            .select("base_price product_name details photos")
        await result.forEach(i=>{
            const date = new Date();
            if(i.time_stamp<=date){
                Item.findOneAndUpdate(i._id, {sold:true})
                    .catch(err=>console.log(err))
            }
        })
        // console.log(result);
        res.status(200).json(result);
    }catch(err){
        res.status(500).send({msg:"error"})
        console.log(err);
    }
})

module.exports = router;