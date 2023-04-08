const {mockRequest, mockResponse} = require("../intercepter");
const User = require("../../models/user.model");
const Ticket = require("../../models/ticket.model");
const client = require("../../utils/NotificationClient").client;
const {createTicket} = require("../../controllers/ticket.controller");

jest.setTimeout(30000);
const db = require("../db");
beforeAll(async () => await db.connect());
afterEach(async () => await db.clearDatabase());
afterAll(async () => db.closeDatabase());

const userTestPayload = {
 userType: "CUSTOMER",
 password: "12345677",
 name: "Test",
 userId: 1,
 email: "test@relevel.com",
 ticketsAssigned: [],
 ticketsCreated: [],
 save: jest.fn() 
}

const ticketCreateTestPayload = {
    title: "Test",
    ticketPriority: 4,
    description: "Test",
    status: "OPEN",
    reporter: 1,
    assignee: 1,
    createdAt: Date.now(),
    updatedAt: Date.now()
}

const ticketTestPayload = {
    title: "Test",
    ticketPriority: 4,
    description: "Test",
    status: "OPEN",
    assignee: 1,
    reporter: 1,
    save: jest.fn().mockImplementation(Promise.resolve(ticketCreateTestPayload))
}

describe('createTicket', () => {

    it('should  pass', async() => {
        const Userspy = jest.spyOn(User, 'findOne').mockReturnValue(Promise.resolve(userTestPayload));
        const clientSpy = jest.spyOn(client,'post').mockImplementation((url, args, cb) => cb("Test", null));
        req = mockRequest(); 
        res = mockResponse(); 
        req.body = ticketTestPayload

        await createTicket(req, res);

        expect(Userspy).toHaveBeenCalled();
        expect(clientSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                assignee: "1",
                description: "Test",
                status: "OPEN",
                ticketPriority: 4,
                title: "Test"
            })
        )
    })
})