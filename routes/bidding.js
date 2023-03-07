const express = require("express");
const router = express.Router();
const Item = require("../models/Items");
const moment = require("moment");

router.get("/:id", async(req, res)=>{
    // console.log(req.params);
    const {id} = req.params;
    try {
        let {photos, base_price, details, location, current_bid, time_stamp, _id} = await Item.findOne({
            _id : id,
            sold: false,
            expired: false
        });
        // time_stamp = JSON.stringify(time_stamp);
        // console.log(time_stamp);
        res.render("bidding", {photos, base_price, details, location, current_bid, time_stamp, _id, name: req.user.name, user_id: req.user._id});
    } catch (error) {
        res.status(502).json({msg:"Invalid Item"})
        console.log(error);
    }
})
module.exports = router;