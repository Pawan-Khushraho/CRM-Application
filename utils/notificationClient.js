var Client = require("node-rest-client").Client;

var client = new Client();
exports.client = client;

exports.sendEmail = (ticketId,subject,content,emailIds,requestor)=>{
    var reqBody ={
        subject: subject,
        content: content,
        recipientEmails: emailIds,
        requestor:requestor,
        ticketId: ticketId
    }

    var args = {
        data: reqBody,
        headers: {"Content-Type":"application/json"}
    }
    //we can keep the hardcoded url

    client.post("http://localhost:7777/notifServ/api/v1/notifications",args,function(data,response){
        console.log("Request Sent");
        console.log(data)
    })
}