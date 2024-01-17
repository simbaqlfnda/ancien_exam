var express = require("express");//pardefaut
const{ Joke } = require("../models/joke");

var router = express.Router();
const jokeModel = new Joke();

// lecture de toute les blagues
router.get("/", async function(req, res){
    const joke = jokeModel.getAll();
    if(!joke) return res.sendStatus(404).end();

    return res.json(joke);
});

// lecture d'une blague au hasard
router.get("/chance/", async function(req, res){
    const joke = jokeModel.getOneChance();
    if(!joke) return res.sendStatus(404).end();

    return res.json(joke);
});

// creation d'une blague
router.post("/", async function(req, res) {
    if(!req.body ||
        (req.body.content.length == 0 && !req.body.content.trim()))
        return res.status(400);
    const joke = jokeModel.addOne(req.body);
    
    return res.json(joke);
});

module.exports = router;