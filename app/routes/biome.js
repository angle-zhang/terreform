const router = require('express').Router();
const shortid = require('shortid');
let Biome = require('../models/biome.model'); //load in what an biome looks like

//get request for all biomes
router.route('/').get((req, res) => {
  Biome.find()
    .then((biomes) => res.json(biomes))
    .catch((err) => res.status(400).json('Error: ' + err));
});

//Get a certain biome by ID
router.route('/:id').get((req, res) => {
  Biome.findById(req.params.id)
    .then((biome) => res.json(biome))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id/add').post((req, res) => {
  Biome.findById(req.params.id)
    .then((biome) => {
      const newDonation = { ...req.body.donation, id: shortid() };
      biome.donation_list.push(newDonation);
      biome
        .save()
        .then(() => res.json({ ...newDonation }))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
