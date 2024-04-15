const express = require("express");
const cors = require("cors");
const app = express();
require("./config/mongoose.config");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./routes/user.routes");
const resourceRoutes = require("./routes/resource.routes");
const sessionRoutes = require("./routes/session.routes");

userRoutes(app);
resourceRoutes(app);
sessionRoutes(app);

app.listen(8000, () => {
    console.log("listening on port 8000");
});
