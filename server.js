require("dotenv").config();
const passport = require("./config/passport.conf");
const express = require("express");
const app = express();
const userRoutes = require("./routes/user.routes");
const gearRoutes = require("./routes/gear.routes");
const onTourRoutes = require("./routes/onTour.routes");

const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(bodyParser.json());
app.use("/users", userRoutes);

app.use("/users", userRoutes);
app.use("/gear", gearRoutes);
app.use("/onTour", onTourRoutes);

app.get("/", (req, res) => res.send("Bandages App"));
app.get("*", (req, res) => res.redirect("/"));

app.listen(port, () => console.log(`The club is open on port ${port}!`));
