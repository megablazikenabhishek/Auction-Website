const express = require("express");
const router = express.Router();
const uploader = require("express-fileupload");
const cloudinary = require("../config/cloudinary");
const Item = require("../models/Items");
const path = require("path");
const isAuth = require("../middlewares/authorizationMiddleware");

const getTimeStamp = (s)=>{
    var date = new Date();
    date.setDate(date.getDate() + Number(s));
    return date;
}

router.use(isAuth);
router.use("/bid", require("./bidding"));
router.get("/uploadItem", (req, res)=>{
    res.render("upload");
})

router.get("/", (req, res)=>{
    // console.log(req.user);
    res.render("home");
})

router.post("/uploadItem", uploader({useTempFiles:true}) , async(req, res)=>{
    let product = {
        product_name : req.body.name,
        base_price : req.body.base_price,
        current_bid: {
            amount: req.body.base_price,
        },
        time_stamp: getTimeStamp(req.body.time_stamp),
        location: req.body.location,
        details: req.body.details,
        photos: [],
        seller:{
            name: req.user.name,
            _id: req.user.id
        }
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
                await new Promise((resolve)=>{
                    cloudinary.uploader.upload(i.tempFilePath, (err, result)=>{
                        try {
                            product.photos.push(result.url);
                            resolve();
                        } catch (error) {
                            require("rimraf")("tmp");
                            console.log(error);
                        }
                    }).catch(err=>console.log(err))
                })
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
        let result = await Item.find({sold:false, expired: false})
            .select("current_bid product_name details photos time_stamp")
        result.map(async i=>{
            const date = new Date();
            if(i.time_stamp<=date){
                await Item.findOneAndUpdate(i._id, {expired:true})
                .catch(err=>console.log(err))
            }else   
            return i;
        })
        // console.log(result);
        res.status(200).json(result);
    }catch(err){
        res.status(500).send({msg:"error"})
        console.log(err);
    }
})

module.exports = router;