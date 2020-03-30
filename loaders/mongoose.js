const mongoose = require('mongoose');

exports.mongooseLoader = async() => {
	const connection = await mongoose.connect(process.env.DATABASE_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
	return connection;
}