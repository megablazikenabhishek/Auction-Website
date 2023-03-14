const express = require("express")
const router = express.Router();
const Item = require("../models/Items");
const format = require("date-format");


router.get("/", async(req, res)=>{
    try {
        let list = await Item.find({"seller.name":req.user.name, "seller._id": req.user._id})
            .select("product_name time_stamp photos sold expired current_bid    ")
        
        for (let i = 0; i < list.length; i++) {
            list[i].time = format.asString("dd/MM/yyyy", new Date(list[i].time_stamp))
        }
        // console.log(list);
        res.render("profile", {myItem: list});
    } catch (error) {
        console.log(error);
    }
})

module.exports = router