const Router = require("koa-router");
const MethodQueries = require("../db/queries/methodsQueries.js");
const MethodModelClass = require("../model/methodModel.js");
const auth = require("../model/auth");

const MethodModel = new MethodModelClass();
const router = new Router();
const BASE_URL = "/api/method";

/**
 * Get one method
 */
router.get(`${BASE_URL}/:id`, async (ctx) => {
    const user = await auth.getUser(ctx.headers["x-access-token"]);

    const methodQueries = new MethodQueries(user.connection);

    MethodModel.methodsQueries = methodQueries;

    ctx.body = await MethodModel.getMethod(ctx.params.id);
});

/**
 * Find methods
 */
router.post(`${BASE_URL}/find`, async (ctx) => {
    const user = await auth.getUser(ctx.headers["x-access-token"]);

    const methodQueries = new MethodQueries(user.connection);

    MethodModel.methodsQueries = methodQueries;

    ctx.body = await MethodModel.findMethods(ctx.request.body.searchString);
});

/**
 * Add method
 */
router.post(`${BASE_URL}/add`, async (ctx) => {
    const user = await auth.getUser(ctx.headers["x-access-token"]);

    const methodQueries = new MethodQueries(user.connection);

    MethodModel.methodsQueries = methodQueries;

    ctx.body = await MethodModel.addMethod(ctx.request.body.method);
});

/**
 * Delete method
 */
router.delete(`${BASE_URL}/:id`, async (ctx) => {
    const user = await auth.getUser(ctx.headers["x-access-token"]);

    const methodQueries = new MethodQueries(user.connection);

    MethodModel.methodsQueries = methodQueries;

    await MethodModel.deleteMethod(ctx.params.id);
    ctx.body = {status: "ok"};
});

module.exports = router;
