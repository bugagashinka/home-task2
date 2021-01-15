require("app-module-path").addPath(__dirname);
const express = require("express");
const path = require("path");
const mountRoutes = require("./routes");
const cors = require("cors");
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 9090;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(process.cwd(), "public")));

// Set View Engine
app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

app.use(cors());

app.use(express.json());

mountRoutes(app);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT} port`);
});
