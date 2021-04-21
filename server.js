require("dotenv").config();
const passport = require("./config/passport.conf");
const express = require("express");
const app = express();
const session = require("express-session");
const userRoutes = require("./routes/user.routes");
const gearRoutes = require("./routes/gear.routes");

const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + "/build"));
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: false,
  })
);

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/users", userRoutes);
app.use("/gear", gearRoutes);

app.get("/", (req, res) => res.send("Bandages App"));
// app.get("*", (req, res) => res.redirect("/"));
app.get("*", (req, res) => {
  res.sendFile("/build/index.html", { root: __dirname + "/" });
});

app.listen(port, () => console.log(`The club is open on port ${port}!`));
