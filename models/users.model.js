const bcrypt = require("bcrypt");
const pool = require("../config/mysql.conf");

function isInvalid(val, min, max) {
  return !val || val.length < min || val.length > max;
}

async function signUp(res, username, password) {
  console.log(username, password);
  try {
    if (isInvalid(username, 8, 16) || isInvalid(password, 8, 20)) {
      throw "Invalid Data Provided";
    }
    let [
      user,
    ] = await pool.query("SELECT * FROM users WHERE users.username = ?", [
      username,
    ]);
    if (user.length > 0) {
      throw "Username is already taken";
    }
    const encrypted = await bcrypt.hash(password, 8);
    await pool.query("INSERT INTO users (username, password) VALUES (?,?)", [
      username,
      encrypted,
    ]);
    return res.send({
      success: true,
      data: "Successfully signed up!",
      error: null,
    });
  } catch (err) {
    return res.send({ success: false, data: null, error: err });
  }
}

module.exports.signUp = signUp;
