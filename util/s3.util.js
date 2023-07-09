/**
 * S3 bucket handlers
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */

require('dotenv').config();
const S3 = require('aws-sdk/clients/s3');

//Details required to connect to the S3 bucket
const name = process.env.BUCKET_NAME;
const region = process.env.BUCKET_REGION;




//AWS S3 Bucket file utilities
class S3Utilities {


	/**
	 * Construct S3 client for S3 handling
	 */
	constructor() {
		this.s3 = new S3();
	}




	/**
	 * Upload file to S3 bucket
	 * @param {*} buffer 
	 * @param {*} filename 
	 * @param {*} mimetype 
	 */
	uploadFile(buffer, filename, mimetype) {

		const uploadParams = {
			Bucket: name,
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
			Bucket: name,
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