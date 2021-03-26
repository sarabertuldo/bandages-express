const express = require("express");
const router = express.Router();
const gear = require("../models/gear.model");

router.post("/add", (req, res) => {
  return gear.add(res, req.body);
});

router.delete("/delete/:id", (req, res) => {
  return gear.remove(res, req.params.id);
});

router.patch("/update", (req, res) => {
  return gear.edit(res, req.body);
});

router.get("/all", (req, res) => {
  return gear.all(res);
});

router.post("/user/:id", (req, res) => {
  return gear.all(res, req.params.id);
});

module.exports = router;
