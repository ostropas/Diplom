const Koa = require("koa");
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const router = require("./routes/index");

const app = new Koa();

// allow option method
app.use(cors());

// body parser
app.use(bodyParser());

router.registerRoutes(app);

app.listen(8000);

app.on("error", (err) => {
    // eslint-disable-next-line no-param-reassign
    err.expose = true;
});

console.log("Backend started");
