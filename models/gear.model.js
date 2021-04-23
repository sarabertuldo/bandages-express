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
    const bandmate = gear.bandmate;
    const item = gear.item;
    const insured = gear.insured || false;
    const on_tour = gear.on_tour || false;
    const notes = gear.notes || "";

    await pool.query(
      "INSERT INTO gear (user_id, bandmate, item, insured, on_tour, notes) VALUES (?, ?, ?, ?, ?, ?)",
      [userID, bandmate, item, insured, on_tour, notes]
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

async function remove(res, id) {
  try {
    console.log(id);
    await pool.query(
      "DELETE FROM gear WHERE gear.id = ?",
      // DELETE FROM `gear` WHERE `gear`.`id` = 5
      [id]
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
      gear.item.length > 40
    ) {
      throw "Invalid data provided";
    }
    console.log("update query");
    console.log(gear);

    await pool.query(
      "UPDATE gear SET bandmate = ?, item = ?, notes = ?, insured = ?, on_tour = ? WHERE id = ? AND user_ID = ?",
      [
        gear.bandmate,
        gear.item,
        gear.notes,
        gear.insured,
        gear.on_tour,
        gear.id,
        userID,
      ]
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

async function all(res, req) {
  try {
    const [gear] = await pool.query("SELECT * FROM gear WHERE user_id = ?", [
      req.session.passport.user,
    ]);

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
