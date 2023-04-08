const authController = require("../controllers/auth.controller");
const { verifyUserReqBody}= require("../middlewares/index")


module.exports = function (app) {
    //signup
    app.post("/crm/api/v1/auth/signup",[verifyUserReqBody.validateUserRequestBody],authController.signUp);
    //signin
    app.post("/crm/api/v1/auth/signin",authController.signIn)
}