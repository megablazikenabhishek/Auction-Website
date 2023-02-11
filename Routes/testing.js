const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/room1", (req, res)=>{
    res.sendFile(path.join(__dirname, "../public/test1.html"));
})

router.get("/room2", (req, res)=>{
    res.sendFile(path.join(__dirname, "../public/test2.html"));
})

module.exports = router;