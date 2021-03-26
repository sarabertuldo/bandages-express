const express = require("express");
const router = express.Router();
const onTour = require("../models/onTour.model");

router.post("/onTour", (req, res) => {
  return gear.sendToVan(res, req.body);
});

router.delete("/onTour/:id", (req, res) => {
  return gear.removeFromVan(res, req.params.id);
});

module.exports = router;
