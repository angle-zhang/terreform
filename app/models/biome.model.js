const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const biomeSchema = new Schema({
	//id: {type: Number, required: true, min: [0, 'ID must be non-negative'], unique: true},
	biomename: {type: String, required: true, minlength: 1},
	donation_list: {type: Array, required: true},
	project: {type: Number, required: true},
}, {
	timestamps:true,
});

const Biome = mongoose.model('Biome', biomeSchema);

module.exports = Biome;