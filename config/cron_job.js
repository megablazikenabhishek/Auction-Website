const cron = require("node-cron");
const Item = require("../models/Items");
const getHtml = require("../lib/generatePDF");
const User = require("../models/user");
const nodemailer = require("nodemailer");
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

// cron.schedule('0 1 * * *', async() => {
  // code to run at 1 am every day
const check = async()=>{
    console.log("Running Cron Job for Winners.................");
    try {
        let result = await Item.find({sold:false, expired: true})
            .select("current_bid product_name details photos time_stamp winner");

        const sendMail = [];
        for(let it = 0; it<result.length; it++){
            const i = result[it];
            if(i.current_bid.name !== "-none-"){
                await Item.findOneAndUpdate(i._id, { sold:true,winner:{name:i.current_bid.name, _id:i.current_bid.user_id, amount: i.current_bid.amount}})
                .catch(err=>console.log(err))

                const user = await User.findById(i.current_bid.user_id);
                sendMail.push({name: i.current_bid.name, product_name: i.product_name, price: i.current_bid.amount, time_stamp: i.time_stamp, email: user.email})
            }
        }

        // console.log(sendMail);
        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
        });
        sendMail.forEach(async i => {
            let mailOptions = {
                from: process.env.EMAIL,
                to: i.email,
                subject: 'Certify Email',
                html: getHtml(i.name, i.product_name, i.price, i.time_stamp),
            };
        
            await transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                }
            });
        });
    } catch (error) {
        console.log(error);
    }
}
check();
// });