const Router = require("koa-router");
const auth = require("../model/auth");

const router = new Router();
const BASE_URL = "/api/user";

/**
 * Get usernamse
 */
router.get(`${BASE_URL}`, async ctx => {
  const user = await auth.getUser(ctx.headers["x-access-token"]);
  ctx.body = { status: "ok", username: user.username, role: user.role };
});

module.exports = router;
