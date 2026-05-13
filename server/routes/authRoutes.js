const User = require('../models/User'); // Import the blueprint

const registerUser = async (req, res) => {
    try {
        // 1. Get details from the user request (req.body)
        const { name, email, password, role } = req.body;

        // Validation: Make sure they sent the required fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide name, email, and password' });
        }

        // 2. Check if user already exists
        const userExists = await User.findOne({ email });
        
        if (userExists) {
            // 400 means "Bad Request" (User did something wrong)
            return res.status(400).json({ message: 'User already exists. Please try another email.' });
        }

        // 3. Create the user with name, email, pass, and role
        // (Remember: our pre-save hook in User.js will automatically hash the password here!)
        const user = await User.create({
            name,
            email,
            password,
            role
        });

        // Send back a success response
        // 201 means "Created"
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            message: 'Registration successful!'
        });

    } catch (error) {
        console.error(error);
        // 500 means "Server Error" (We did something wrong, or DB failed)
        res.status(500).json({ message: 'Server error during registration' });
    }
};

// Export the function so our routes can use it
module.exports = { registerUser };