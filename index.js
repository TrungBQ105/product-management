const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const multer = require("multer");

require("dotenv").config();

const database = require("./config/database");
const systemConfig = require("./config/system");

const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");
database.connect();

const app = express();
const port = process.env.PORT;
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser("Croco"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static(`${__dirname}/public`));

route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(` app listening on port ${port}`);
});
