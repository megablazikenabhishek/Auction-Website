const express = require("express");
const router = express.Router();

router.get("/uploadItem", (req, res)=>{
    res.render("upload");
})

router.post("/uploadItem", (req, res)=>{
    res.send("hii");
})

module.exports = router;