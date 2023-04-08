/* Interceptor.js file for req and res mock 
while testing the controller, we need to make sure that the req obj
contains all the desrired param and the body object and the res
object contains the desired body or mess or status code*/


module.exports={
    mockRequest:()=>{
        const req ={}
        req.body = jest.fn().mockReturnValue(req)//{}
        req.params = jest.fn().mockReturnValue(req)//
        return req;
    },
    mockResponse: ()=>{
        const res = {}
        res.status = jest.fn().mockReturnValue(res)//{}
        res.send = jest.fn().mockReturnValue(res)
        return res;
    }
}