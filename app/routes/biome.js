const router = require('express').Router();
let Biome = require('../models/biome.model'); //load in what an biome looks like

//get request for all biomes
router.route('/').get((req, res) => {
  Biome.find()
    .then(biomes => res.json(biomes))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Get a certain biome by ID
router.route('/:id').get((req, res) => {
  Biome.findById(req.params.id)
    .then(biome => res.json(biome))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;