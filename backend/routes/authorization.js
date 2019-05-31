const Router = require("koa-router");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../db/databaseConnection");
const UsersQueries = require("../db/queries/users");
const config = require("../config");

const router = new Router();

const TABLENAME_USERS = "users";

const BASE_URL = "/api";

router.post(`${BASE_URL}/register`, async ctx => {
  const usersModel = new UsersQueries(db.dbConnection(TABLENAME_USERS));

  const user = await usersModel.addUser(ctx.request.body);

  const token = jwt.sign({ id: user.id }, config.secret, {
    expiresIn: 864000 // expires in 24 hours
  });

  ctx.body = { auth: true, token };
});

router.post(`${BASE_URL}/login`, async ctx => {
  const usersModel = new UsersQueries(db.dbConnection(TABLENAME_USERS));

  const user = await usersModel.userByUsername(ctx.request.body.username);
  const passwordIsValid = bcrypt.compareSync(
    ctx.request.body.password,
    user.password
  );
  if (!passwordIsValid) {
    ctx.body = { status: "Something went wrong", errorMsg: "Wrong password" };
    return;
  }

  const token = jwt.sign({ id: user.id }, config.secret, {
    expiresIn: 86400 // expires in 24 hours
  });

  ctx.body = { auth: true, token };
});

module.exports = router;
