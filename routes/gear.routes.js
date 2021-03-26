const express = require("express");
const router = express.Router();
const gear = require("../models/gear.model");

router.post("/add", (req, res) => {
  return todos.add(res, req.body);
});

router.delete("/delete/:id", (req, res) => {
  return todos.remove(res, req.params.id);
});

router.patch("/update", (req, res) => {
  return todos.edit(res, req.body);
});

router.get("/all", (req, res) => {
  return todos.all(res);
});

router.post("/user/:id", (req, res) => {
  return todos.all(res, req.params.id);
});

module.exports = router;
