const express = require("express");
const router = express.Router();
const gear = require("../models/gear.model");
const isAuth = require("../middleware/isAuth");

router.post("/add", isAuth, (req, res) => {
  return gear.add(res, req.body, req.session.passport.user);
});

router.delete("/delete/:id", isAuth, (req, res) => {
  return gear.remove(res, req.params.id);
});

router.patch("/update", isAuth, (req, res) => {
  return gear.edit(res, req.body, req.session.passport.user);
});

router.get("/all", isAuth, (req, res) => {
  return gear.all(res, req);
});

router.post("/user/:id", isAuth, (req, res) => {
  return gear.all(res, req.params.id);
});

module.exports = router;
