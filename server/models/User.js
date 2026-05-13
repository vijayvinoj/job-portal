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
        minlength: 6,
        select: false
	},

	role: {
		type: String,
		enum: ['candidate', 'requiter', 'admin'],
		default: 'candidate'
	},
},
	{
		timestamps: ture //Automatically create created and updated time.


const bcrypt = require('bcryptjs');
userSchema.pre('save', async function(next) {
	if(!this.isModified('password')) {
		return next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);

});

model.exports = mongoose.model('User', userSchema)