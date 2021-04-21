function isAuth(req, res, next) {
  console.log(req.session.passport.user);
  if (!req.session.passport.user) {
    return res.status(401).send({
      success: false,
      data: null,
      error: "Invalid credentials",
    });
  }
  next();
}

module.exports = isAuth;
