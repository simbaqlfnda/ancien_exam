var express = require("express");
const{ Data } = require("../models/data");

var router = express.Router();
const dataModel = new Data();

//get a data
router.get("/:id", async function(req, res){
    const data = dataModel.getOne(req.params.id);
    if(!data) return res.status(404).end();

    return res.json(data);
});


//modifiy a data
router.put("/:id", async function(req, res) {
    if (!req.body || (req.body.hasOwnProperty("content") && req.body.content.length === 0))
        return res.status(400).end();
    const data  = dataModel.updateOne(req.params.id, req.body);
    if(!data) return res.sendStatus(404);
    return res.json(data)
});

module.exports = router;
