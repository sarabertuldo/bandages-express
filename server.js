require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Bandages App"));
app.get("*", (req, res) => res.redirect("/"));

app.listen(port, () => console.log(`The club is open on port ${port}`));
