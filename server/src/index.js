const express = require("express");
const path = require("path");
const mountRoutes = require("./routes");
const cors = require("cors");

const PORT = process.env.PORT || 9090;

const app = express();
app.use(cors());
app.use(express.static(path.join(process.cwd(), "public")));
app.use(express.json());
mountRoutes(app);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT} port`);
});
