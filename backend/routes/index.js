const authorization = require("./authorization.js");
const userRouter = require("./user.js");
const additionalInfo = require("./additionalInfo.js");
const method = require("./method.js");

function registerRoutes(app) {
    app.use(authorization.routes());
    app.use(userRouter.routes());
    app.use(additionalInfo.routes());
    app.use(method.routes());
}

module.exports = {
    registerRoutes
};
