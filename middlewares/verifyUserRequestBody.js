/*
 this file will contain the middleware for validating the userId and email
*/

const User = require("../models/user.model");
const constants = require("../utils/constants");


validateUserRequestBody = async(req,res,next)=>{
    if (!req.body.name) {
        res.status(400).send({
            message:"Failed! Username not provided"
        });
        return;
    }

    if(!req.body.userId){
        res.status(400).send({
            message:"Failed! UserId not Provided"
        });
        return;
    }

    const UserID = await User.findOne({userId:req.body.userId});
    if(UserID != null){
        res.status(400).send({
            message:"Failed! UserId already exists."
        });
        return;
    }

    const email = await User.findOne({email:req.body.email});
    if(email != null){
        res.status(400).send({
            message:"Failed! Email already exists."
        });
        return;
    }

    const userType = req.body.userType;
    const userTypes = [constants.userTypes.customer,constants.userTypes.admin,constants.userTypes.engineer]

    if(!userType || !userTypes.includes(userType)){
        res.status(400).send({
            message:"Failed! User Type Invalid. Possible values CUSTOMER | ENGINEER | ADMIN"
        });
        return;
    }

    next();
}

validateUserStatusAndUserType = async(req,res,next)=>{
    const userType = req.body.userType;
    const userTypes = [constants.userTypes.admin,constants.userTypes.customer,constants.userTypes.engineer];

    if(userType && !userTypes.includes(userType)){
        res.status(400).send({
            message:`UserType provided is invalid. Possible values CUSTOMER | ADMIN | ENGINEER`
        });
        return;
    }
    const userStatus = req.body.userStatus;
    const userStatuses = [constants.userStatus.approved,constants.userStatus.pending,constants.userStatus.rejected];

    if(userStatus && !userStatuses.includes(userStatus)){
        res.status(400).send({
            message:`UserStatus provided is invalid. Possible values APPROVED | PENDING | REJECTED`
        });
        return;
    }

    next();
}

module.exports ={
    validateUserRequestBody:validateUserRequestBody,
    validateUserStatusAndUserType:validateUserStatusAndUserType
}