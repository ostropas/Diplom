const Router = require("koa-router");
const AdditionalnfoTypeQueries = require("../db/queries/additionalInfoType.js");
const AdditionalnfoTypeModelClass = require("../model/additionalInfoTypeModel.js");
const auth = require("../model/auth");

const AdditionalnfoTypeModel = new AdditionalnfoTypeModelClass();
const router = new Router();
const BASE_URL = "/api/additionalInfoTypes";

/**
 * Get all types
 */
router.get(`${BASE_URL}`, async ctx => {
  const user = await auth.getUser(ctx.headers["x-access-token"]);

  const additionalnfoTypeQueries = new AdditionalnfoTypeQueries(
    user.connection
  );

  AdditionalnfoTypeModel.additionalInfoQueries = additionalnfoTypeQueries;

  ctx.body = await AdditionalnfoTypeModel.allTypes();
});

/**
 * Get one type
 */
router.get(`${BASE_URL}/:id`, async ctx => {
  const user = await auth.getUser(ctx.headers["x-access-token"]);

  const additionalnfoTypeQueries = new AdditionalnfoTypeQueries(
    user.connection
  );

  AdditionalnfoTypeModel.additionalInfoQueries = additionalnfoTypeQueries;

  ctx.body = await AdditionalnfoTypeModel.getType(ctx.params.id);
});

/**
 * Add one type
 */
router.post(`${BASE_URL}/add`, async ctx => {
  const user = await auth.getUser(ctx.headers["x-access-token"]);
  if (user.role !== 1  || user.role !== 2) {
    ctx.body = -1;
    return;
  }

  const additionalnfoTypeQueries = new AdditionalnfoTypeQueries(
    user.connection
  );

  AdditionalnfoTypeModel.additionalInfoQueries = additionalnfoTypeQueries;

  ctx.body = await AdditionalnfoTypeModel.addType(ctx.request.body.title);
});

module.exports = router;
