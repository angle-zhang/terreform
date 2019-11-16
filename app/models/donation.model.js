const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const donationSchema = new Schema({
	username: {type: String, required: true, minlength: [1, 'Name must not be empty']},
	position: {type: Array, required: true},
	message: {type: String, required: true, maxlength: [400, 'Message too long']},
	location: {type: String, required: true},
}, {
	timestamps:true,
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;