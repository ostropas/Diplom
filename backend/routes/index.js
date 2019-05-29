const authorization = require("./authorization.js");
const userRouter = require("./user.js");

function registerRoutes(app) {
    app.use(authorization.routes());
    app.use(userRouter.routes());
}

module.exports = {
    registerRoutes
};
