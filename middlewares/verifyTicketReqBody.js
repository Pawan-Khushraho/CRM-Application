const constants = require("../utils/constants");

validateTicketReqBody = async(req,res,next)=>{
    if(!req.body.title){
        res.status(400).send({
            message:`Failed! Title not provided`
        })
        return;
    }
    if(!req.body.description){
        res.status(400).send({
            message:`Failed! Description not provided`
        })
        return;
    }

    next();
}


validateTicketStatus = async(req,res,next)=>{
    const status = req.body.status;
    const statusTypes = [constants.ticketStatus.open,constants.ticketStatus.closed,constants.ticketStatus.inProgess,constants.ticketStatus.blocked];
    if(status && !statusTypes.includes(status)){
        res.status(400).send({
            message:`ticket status provided is invalid: Possible Values are OPEN | CLOSED | IN_PROGRESS | BLOCKED`
        })
    }

    next();
}

module.exports = {
    validateTicketReqBody: validateTicketReqBody,
    validateTicketStatus: validateTicketStatus
}