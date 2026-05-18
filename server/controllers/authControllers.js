const User = require('../models/User'); 

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide name, email, and password' });
        }

        const userExists = await User.findOne({ email });
        
        if (userExists) {
            return res.status(400).json({ message: 'User already exists. Please try another email.' });
        }

       const user = await User.create({
            name,
            email,
            password,
            role
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            message: 'Registration successful!'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

module.exports = { registerUser };