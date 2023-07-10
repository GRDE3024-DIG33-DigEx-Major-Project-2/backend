/**
 * S3 bucket handlers
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */

require('dotenv').config();
var AWS = require("aws-sdk");
const S3 = require('aws-sdk/clients/s3');

//Details required to connect to the S3 bucket
const bucketName = process.env.BUCKET_NAME;

var credentials = new AWS.SharedIniFileCredentials({profile: 'Gigney'});
AWS.config.credentials = credentials;



//AWS S3 Bucket file utilities
class S3Utilities {


	/**
	 * Construct S3 client for S3 handling
	 */
	constructor() {
		this.s3 = new AWS.S3();
		console.log("IN S3 CONSTRUCTOR");
		console.log(this.s3.config.credentials);
		this.s3.config.credentials = credentials;
	}




	/**
	 * Upload file to S3 bucket
	 * @param {*} buffer 
	 * @param {*} filename 
	 * @param {*} mimetype 
	 */
	upload(buffer, filename, mimetype) {
console.log("uploading file");
		const uploadParams = {
			Bucket: bucketName,
			Body: buffer,
			Key: filename,
			ContentType: mimetype,
			ACL: 'public-read'
		};

		this.s3.upload(uploadParams, () => {}, (err) => {
			console.log(err);
		});
	}


	/**
	 * Delete file from S3 bucket
	 * @param {*} filename 
	 */
	deleteFile(filename) {

		const deleteParams = {
			Bucket: bucketName,
			Key: filename
		};

		this.s3.deleteObject(deleteParams, () => {}, (err) => {
			console.log("s3 delete failed");
			console.log(err);
		});


	}



}


//Export S3Utilities
module.exports = new S3Utilities();