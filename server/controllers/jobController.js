const Job = require('../models/Job');

const createJob = async(req, res) => {

	try {

		const { title, company, description, skills, recruiterId } = req.body;
	
		if( !title || !company || !description ) {
			return res.status(400).json({ message: 'Please provide title, company name and description'});
		}
	

	const job = await Job.create({
		title,
		company,
		description,
		skills,
		recruiterId
	});

	res.status(201).json({
		_id: job._id,
		title: job.title,
		company: job.company,
		description: job.description,
		skills: job.skills,
		message: 'Job Created Succesfully.'
	});
		

	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Server error during creating the job'});
	}


};

module.exports = { createJob };



