function msg(req, res, next) {
  console.log("Mmmmbop dop ba du bop");
  return next();
}

module.exports = msg;
