const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

//routes

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const jobRoutes = require('./routes/jobRoutes');
app.use('/api/job', jobRoutes);

app.get('/', (req,res) => {
	res.send("API Running !!!!!")
});

const PORT = process.env.PORT || 3000; //port

app.listen(PORT, () => {
	console.log(`server is running on ${PORT}`);
});