const jwt = require("jsonwebtoken")
const SECRET_JWT  = require("../config")

function authMiddleware(req,res,next){
    console.log(req.headers);
    const headers = req.headers.authorization;
    const token = headers.split(" ")[1];
    const decoded = jwt.verify(token,SECRET_JWT);
    try{
        if(decoded){
            req.userId = decoded;
        }
        next();
    }
    catch(e){
        console.log(e)
        return res.status(403).json({msg: "auth error"})
    }
}

module.exports = authMiddleware