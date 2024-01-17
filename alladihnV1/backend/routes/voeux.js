"use strict";
let express = require("express");
let router = express.Router();
let Voeu = require("../models/Voeu.js");


// Create a new Voeu : POST /api/voeux/
router.post("/", function (req, res) {  
  let newVoeu = new Voeu(req.body);
  console.log(newVoeu);
  newVoeu.save();
  return res.json(newVoeu);
});

// Read all the existing films : GET /api/films/
router.get("/",  function (req, res) {
  const voeu = Voeu.getRandomVoeu();
  return res.json(voeu);
});

module.exports = router;
