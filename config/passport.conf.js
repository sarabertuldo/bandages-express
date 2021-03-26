const passport = require("passport");
const pool = require("./mysql.conf");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

function isInvalid(val, min, max) {
  return !val || val.length < min || val > max;
}

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      if (isInvalid(username, 8, 16) || isInvalid(password, 8, 20)) {
        return done(null, false, "Invalid data provided");
      }
      let [
        users,
      ] = await pool.query("SELECT * FROM users WHERE users.username = ?", [
        username,
      ]);
      if (users.length === 0) {
        return done(null, false, "Invalid username");
      }
      const match = await bcrypt.compare(password, users[0].password);
      if (!match) {
        return done(null, false, "Invalid password");
      }
      return done(null, users[0]);
    } catch (err) {
      return done(err, false);
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const [user] = await pool.query("SELECT * FROM users WHERE users.id = ?", [
      id,
    ]);
    if (!user[0]) {
      return done(null, false);
    }
    return done(null, user[0]);
  } catch (err) {
    done(err, false);
  }
});

module.exports = passport;
