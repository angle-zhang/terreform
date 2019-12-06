const router = require('express').Router();
let Donation = require('../models/donation.model'); //load in model for donations

// get request for all donations
router.route('/').get((req, res) => {
  Donation.find()
    .then((donations) => res.json(donations))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// add a donation
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const position = req.body.position;
  const message = req.body.message;
  const location = req.body.location;

  const newDonation = new Donation({ username, position, message, location });

  newDonation
    .save()
    .then(() => res.json('Donation added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// find a donation by id
router.route('/:id').get((req, res) => {
  Donation.findById(req.params.id)
    .then((donation) => res.json(donation))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// delete a donation by id request
router.route('/:id').delete((req, res) => {
  Donation.findByIdAndDelete(req.params.id)
    .then(() => res.json('Donation deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// update a donation by id request
router.route('/update/:id').post((req, res) => {
  Donation.findById(req.params.id)
    .then((donation) => {
      donation.username = req.body.username;
      donation.position = req.body.position;
      donation.message = req.body.message;
      donation.location = req.body.location;

      donation
        .save()
        .then(() => res.json('Donation updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id/add').post((req, res) => {
  Biome.findById(req.params.id)
    .then((biome) => {
      biome.donation_list.push(req.body.donation);
      biome
        .save()
        .then(() => res.json('Biome donation list updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;

