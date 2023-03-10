const corn = require("node-cron");
const Item = require("../models/Items");
corn.schedule("0 0 * * *", async()=>{
    console.log("Running Cron Job........");
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
    }catch(err){
        console.log(err);
    }
})