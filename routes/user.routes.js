const userController = require("../controllers/user.controller");
const {verifyUserReqBody,authJwt} = require("../middlewares/index");

module.exports = function(app){
    //get user
    app.get("/crm/api/v1/users",[authJwt.verifyToken,authJwt.isAdmin],userController.findAll);
    //get user by id
    app.get("/crm/api/v1/users/:userId",[authJwt.verifyToken,authJwt.isAdmin],userController.findById);
    //update user details
    app.put("/crm/api/v1/users/:userId",[authJwt.verifyToken,authJwt.isAdmin,verifyUserReqBody.validateUserStatusAndUserType],userController.update);
}