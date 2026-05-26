const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'please add a name'],
		trim: true
	},

	email: {
		type: String,
		required: [true, 'please add an email'],
		unique: true,
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'please add a valid email']
	},

	password: {
		type: String,
        required: [true, 'Please add a password'],
        minLength: 6,
        select: false
	},

	role: {
		type: String,
		enum: ['candidate', 'requiter', 'admin'],
		default: 'candidate'
	},
},
	{
		timestamps: true
});

const bcrypt = require('bcryptjs');
userSchema.pre('save', async function(next) {
	if(!this.isModified('password')) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);

});

module.exports = mongoose.model('User', userSchema);