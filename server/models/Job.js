const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema({

	title: {
		type: String,
		required: [true, 'please add a title'],
		trim: true
	},

	company: {
		type: String,
		required: [true, 'please add a company name'],

	},

	description: {
		type: String,
		required: [true, 'please add a company description'],
		maxLength: 2000,
	},

	skills: {
		type: [String],

	},

	recruiterId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'please enter your ID']
	},
},
	{
	timestamps: true
	
});

module.exports = mongoose.model('job', jobSchema);