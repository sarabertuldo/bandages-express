const pool = require("../config/mysql.conf");

async function add(res, gear, userID) {
  try {
    if (
      !gear.item ||
      gear.item.length < 1 ||
      gear.item.length > 40 ||
      isNaN(userID)
    ) {
      throw "Invalid data provided";
    }

    await pool.query(
      "INSERT INTO gear (user_ID, item, insured) VALUES (?,?,false)",
      [userID, gear.item]
    );

    return res.send({
      success: true,
      data: "Successfully Added Gear",
      error: null,
    });
  } catch (err) {
    console.log(err);
    return res.send({
      success: false,
      data: null,
      error: err,
    });
  }
}

async function remove(res, id, userID) {
  try {
    await pool.query(
      "DELETE FROM gear WHERE gear.id = ? AND gear.user_ID = ?",
      [id, userID]
    );
    return res.send({
      success: true,
      data: "Successfully Deleted",
      error: null,
    });
  } catch (err) {
    return res.send({
      success: false,
      data: null,
      error: err,
    });
  }
}

async function edit(res, gear, userID) {
  try {
    if (
      isNaN(gear.id) ||
      !gear.item ||
      gear.item.length < 1 ||
      gear.item.length > 40 ||
      typeof gear.insured !== "boolean"
    ) {
      throw "Invalid data provided";
    }
    await pool.query(
      "UPDATE gear SET item = ?, insured = ? WHERE id = ? AND user_ID = ?",
      [gear.item, gear.insured, gear.id, userID]
    );

    return res.send({
      success: true,
      data: "Successfully updated Gear",
      error: null,
    });
  } catch (err) {
    return res.send({
      success: false,
      data: null,
      error: err,
    });
  }
}

async function all(res) {
  try {
    const [gear] = await pool.query("SELECT * FROM gear");

    res.send({
      success: true,
      data: gear,
      error: null,
    });
  } catch (err) {
    return res.send({
      success: false,
      data: null,
      error: err,
    });
  }
}

async function byUserID(res, userID) {
  try {
    const [gear] = await pool.query(
      "SELECT * FROM gear WHERE gear.user_ID = ?",
      [userID]
    );

    res.send({
      success: true,
      data: gear,
      error: null,
    });
  } catch (err) {
    return res.send({
      success: false,
      data: null,
      error: err,
    });
  }
}

module.exports = { add, remove, edit, all, byUserID };
