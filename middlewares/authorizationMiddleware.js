const isAuth = (req, res, next)=>{
    if(req.isAuthenticated())
        next();
    else
        res.send("<h1>You are not logged in.......<h1>");
}

module.exports = isAuth;