const {mockRequest,mockResponse}= require("../intercepter");

const {findAll,findById,update}= require("../../controllers/user.controller")

const User = require("../../models/user.model");


const userTestPayLoad = {
    userType:"CUSTOMER",
    password:"12345678",
    name:"Test",
    userId:1,
    email:"test@relevel.com",
    userStatus:"APPROVED",
    ticketsCreated:[],
    ticketsAssigned:[],
    exec:jest.fn()
}

describe('Update', () => {
    it("should pass",async()=>{
        const userSpy = jest.spyOn(User,"findOneAndUpdate").mockImplementation(()=>({
            exec: jest.fn().mockReturnValue(userTestPayLoad)
        }));
        const req = mockRequest();
        const res = mockResponse();

        req.params = {userId:1};
        req.body = userTestPayLoad;
        await update(req,res);

        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            message:`User record has been updated successfully`
        })
    })

    it("should fail",async()=>{
        const userSpy = jest.spyOn(User,"findOneAndUpdate").mockImplementation(cb=>cb(new Error("This is an error"),null));
        const req = mockRequest();
        const res = mockResponse();
        req.params = {userId:1};
        await update(req,res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            message:`Internal Server Error`
        })
    })
})

describe('findById', () => {
    it("should pass",async()=>{
        const userSpy = jest.spyOn(User,"find").mockReturnValue(Promise.resolve([userTestPayLoad]));
        const req = mockRequest();
        const res = mockResponse();
        req.params = {userId:1};
        req.body = userTestPayLoad;
        await findById(req,res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    name:"Test",
                    userId:1,
                    email:"test@relevel.com",
                    userType:"CUSTOMER",
                    userStatus:"APPROVED"
                })
            ])
        );
    });

    it("should pass without data",async()=>{
        const userSpy = jest.spyOn(User,"find").mockReturnValue(Promise.resolve(null));
        const req = mockRequest();
        const res = mockResponse();
        req.params = {userId:1};
        await findById(req,res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            message:`User with this id [1] is not present`
        })
    })
})


//findAll unit testing

describe('findAll', () => {
    it("should pass",async()=>{
       
        const userSpy = jest.spyOn(User, 'find').mockReturnValue(Promise.resolve([userTestPayLoad]));
        const req = mockRequest();
        const res = mockResponse();
        req.query = {}
        await findAll(req,res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    name:"Test",
                    userId:1,
                    email:"test@relevel.com",
                    userType:"CUSTOMER",
                    userStatus:"APPROVED"
                })
            ])
        );
    })
    it("should pass with userStatus",async()=>{
        
    })
    it("should pass with userType",async()=>{
        
    })
    it("should pass with userType and userStatus",async()=>{
        
    })
    it("should pass with name",async()=>{
        
    })
    it("should fail", async () =>{
        const userSpy = jest.spyOn(User, 'find').mockReturnValue(Promise.reject(new Error("error")));
        const req = mockRequest();
        const res = mockResponse();
        req.query = {}
        await findAll(req, res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
        message: "Some Internal Error Occured"
        });
        })
})