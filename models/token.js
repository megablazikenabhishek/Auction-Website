const mongoose = require("mongoose");

const getData = ()=>{
    let date = new Date();
    date.setHours(date.getHours()+3);
    return date;
}

const TokenSchema = new mongoose.Schema({
    email: String,
    token: String,
    name: String,
    username: String,
    password: String,
    createdAt: { type: Date, default: Date.now, expires: 3600 },
});

module.exports = mongoose.model("Token", TokenSchema);