const {mongooseLoader} = require('./mongoose');
const {expressLoader} = require('./express');

exports.init = async(app) => {
	const mongoose = await mongooseLoader();
	await expressLoader(app, mongoose);
}