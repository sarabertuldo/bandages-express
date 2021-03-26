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

// async function edit(res, onTour, userID) {
//   try {
//     if (isNaN(gear.id)) {
//       throw "Invalid data provided";
//     }
//     await pool.query(
//       "UPDATE gear SET item = ?, insured = ?, WHERE id = ? AND user_ID = ?",
//       [onTour.gear_id, onTour.url, onTour.title, onTour.id, userID]
//     );

//     return res.send({
//       success: true,
//       data: "Successfully updated the van",
//       error: null,
//     });
//   } catch (err) {
//     return res.send({
//       success: false,
//       data: null,
//       error: err,
//     });
//   }
// }

// async function all(res) {
//   try {
//     const [onTour] = await pool.query("SELECT * FROM onTour");
//     res.send({
//       success: true,
//       data: onTour,
//       error: null,
//     });
//   } catch (err) {
//     return res.send({
//       success: false,
//       data: null,
//       error: err,
//     });
//   }
// }

// async function byUserID(res, userID) {
//   try {
//     // get by userID
//     const [
//       onTour,
//     ] = await pool.query("SELECT * FROM onTour WHERE onTour.user_ID = ?", [
//       userID,
//     ]);
//     // send success message
//     res.send({
//       success: true,
//       data: onTour,
//       error: null,
//     });
//   } catch (err) {
//     return res.send({
//       success: false,
//       data: null,
//       error: err,
//     });
//   }
// }

module.exports = { add, remove, edit, all, byUserID };
