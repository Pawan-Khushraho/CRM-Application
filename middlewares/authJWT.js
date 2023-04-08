const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");
const User = require("../models/user.model");
const constants = require("../utils/constants");

verifyToken = (req,res,next)=>{

    let token = req.header("x-access-token");

    if(!token){
        return res.status(403).send({
            message:"No Token Provided."
        });
    }

    jwt.verify(token,config.secret,(error,decoded)=>{
        if(error){
            return res.status(401).send({
                message:"Unauthorized"
            })
        }

        req.userId = decoded.id;
        next();
    })
}

isAdmin = async(req,res,next)=>{
    const user = await User.findOne({
        userId: req.userId
    })

    if(user && user.userType == constants.userTypes.admin){
        next();
    }else{
        res.status(403).send({
            message:"Require Admin Role!"
        })
        return;
    }
}

module.exports = {
    verifyToken:verifyToken,
    isAdmin:isAdmin
}