const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    product_name: String,
    date: { type: Date, default:new Date() },
    time_stamp: Date,
    photos: {
        type: Array,
        default: []
    },
    details: String,
    base_price: Number,
    sold: {type: Boolean, default: false},
    seller_name:String,  
    location: String, 
    // bid section
    prev_bid :{
        type: Number,
    },
    current_bid:{
        type: Number
    }
});


let Item = mongoose.model('Items', ItemSchema);

module.exports = Item;