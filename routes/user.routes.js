const express = require("express");
const router = express.Router();
const user = require("../models/users.model");
const passport = require("passport");

router.get("/authenticate", (req, res) => {
  if (!req.user) {
    return res.send({ success: false, data: null, error: null });
  }
  return res.send({
    success: true,
    data: { username: req.user.username },
    error: null,
  });
});

router.post("/signup", (req, res) => {
  return user.signUp(res, req.body.username, req.body.password);
});

router.post("/login", (req, res) => {
  passport.authenticate("local-login", (err, user, info) => {
    if (err) {
      return res.send({
        success: false,
        data: null,
        error: "Something went wrong please try again later",
      });
    }
    if (!user) {
      return res.send({ success: false, data: null, error: info });
    }
    req.logIn(user, (err) => {
      res.cookie("name", "boml&ma4ubbb", {
        httpOnly: true,
        secure: true,
      });
      return res.send({
        success: true,
        data: { username: user.username },
        error: null,
      });
    });
  })(req, res);
});

router.get("/logout", (req, res) => {
  req.logOut();
  return res.send({ success: true, data: [], error: null });
});

module.exports = router;
