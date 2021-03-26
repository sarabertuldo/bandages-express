const pool = require("../config/mysql.conf");

async function sendToVan(res, onTour, userID) {
  try {
    if (!onTour.gear_id || onTour.gear_id.length < 1 || isNaN(userID)) {
      throw "Invalid data provided";
    }
    await pool.query(
      "INSERT INTO onTour (user_ID, gear_id, title, url) VALUES (?,?,?,?)",
      [userID, onTour.gear_id, onTour.title, onTour.url]
    );
    return res.send({
      success: true,
      data: "Successfully added to the van",
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

async function removeFromVan(res, id, userID) {
  try {
    await pool.query(
      "DELETE FROM onTour WHERE onTour.id = ? AND onTour.user_ID = ?",
      [id, userID]
    );
    return res.send({
      success: true,
      data: "Successfully removed from van",
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

module.exports = { sendToVan, removeFromVan };
