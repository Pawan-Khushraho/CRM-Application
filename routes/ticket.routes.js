const ticketController = require("../controllers/ticket.controller");
const {authJwt,validateTicketReqBody} = require("../middlewares/index");
const verifyTicketReqBody = require("../middlewares/verifyTicketReqBody");


module.exports = function(app){
    //create ticket
    app.post("/crm/api/v1/tickets",[authJwt.verifyToken,verifyTicketReqBody.validateTicketReqBody],ticketController.createTicket);
    //update ticket
    app.put("/crm/api/v1/tickets/:id",[authJwt.verifyToken,verifyTicketReqBody.validateTicketStatus],ticketController.updateTicket);
    //get all the ticket
    app.get("/crm/api/v1/tickets",[authJwt.verifyToken],ticketController.getAllTickets);
    //get the details of a particular ticket
    app.get("/crm/api/v1/tickets/:id",[authJwt.verifyToken],ticketController.getOneTicket);
}