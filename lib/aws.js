const S3 = require('aws-sdk/clients/s3');
const s3 = new S3();

exports.upload = async (name, image) => {
	let response = await s3.upload({
		Bucket: process.env.s3Bucket,
		Key: name,
		Body: image
	}).promise();

	return response.Location;
}

exports.getImage = async (name) => {
	let response = await s3.getObject({
		Bucket: process.env.s3Bucket,
		Key: name
	}).promise();

	return response.body;
}