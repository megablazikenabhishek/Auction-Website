const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    user_id: String,
    product_name: String,
    date: { type: Date, default:new Date() },
    timestamp: Date,
    photos: {
        type: Array,
        default: []
    },
    details: String,
    base_price: Number,
    sold: {type: Boolean, default: false},
    seller_name:String,  
    location: String, 
});


let Item = mongoose.model('Items', ItemSchema);

module.exports = Item;