const express = require("express")
const router = express.Router();
const Item = require("../models/Items");
const format = require("date-format");

router.use(require("../middlewares/authorizationMiddleware"));
router.get("/", async (req, res) => {
  try {
    let list =
        await Item
            .find({"seller.name" : req.user.name, "seller._id" : req.user._id})
            .select(
                "product_name time_stamp photos sold expired current_bid base_price")

    let total_sellings = 0, total_unsold = 0, profit = 0;
    for (let i = 0; i < list.length; i++) {
      list[i].time = format.asString("dd/MM/yyyy", new Date(list[i].time_stamp))
      if (list[i].sold) {
        total_sellings++;
        profit += list[i].current_bid.amount - list[i].base_price;
        console.log(list[i].base_price);
      }
      else total_unsold++;
    }
    // console.log(list);
    res.render("profile",
               {myItem : list, total_sellings, total_unsold, profit});
  } catch (error) {
    console.log(error);
  }
})

module.exports = router