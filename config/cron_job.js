const cron = require("node-cron");
const Item = require("../models/Items");
// declaring the winner is remaining yet

cron.schedule("0 0 * * *", async()=>{
    console.log("Running Cron Job for update........");
    try{
        let result = await Item.find({sold:false, expired: false})
            .select("current_bid product_name details photos time_stamp")
        result.map(async i=>{
            const date = new Date();
            if(i.time_stamp<=date && i.current_bid.name !== "-none-"){
                await Item.findOneAndUpdate(i._id, {expired:true, sold: true})
                .catch(err=>console.log(err))
            }
            else if(i.time_stamp<=date){
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

cron.schedule('0 1 * * *', async() => {
  // code to run at 1 am every day
    console.log("Running Cron Job for Winners.................");
    try {
        let result = await Item.find({sold:false, expired: true})
            .select("current_bid product_name details photos time_stamp winner");

        result.map(async i=>{
            if(i.current_bid.name !== "-none-"){
                await Item.findOneAndUpdate(i._id, {winner:{name:i.current_bid.name, _id:i.current_bid.user_id, amount: i.current_bid.amount}})
                .catch(err=>console.log(err))
            }
        })
    } catch (error) {
        
    }
});