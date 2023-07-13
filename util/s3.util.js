/**
 * S3 bucket handlers
 * 
 */

require('dotenv').config();
var AWS = require("aws-sdk");
const sharp = require("sharp");
const path = require("path");

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
	}


	/**
	 * Process and upload an event image to S3 bucket
	 * @param {*} uniqueFilename 
	 * @param {*} buffer 
	 * @param {*} mimetype 
	 * @returns 
	 */
	async uploadEventImg(uniqueFilename, buffer, mimetype) {
		//Sharp-processed image buffer
		let imgBuffer = await sharp(buffer)
			.resize(320, 320)
			// .resize({
			// 	fit: sharp.fit.contain,
			// 	width: 600
			// })
			.jpeg({ quality: 80 })
			.withMetadata()
			.toBuffer();
		//Upload image to S3 bucket
		this.upload(imgBuffer, uniqueFilename, mimetype);
		return uniqueFilename;
	}


	/**
	 * Delete an event image from S3
	 * @param {*} filename 
	 */
	deleteEventImage(filename) {
		this.deleteFile(filename);
	}


	/**
	 * Process and upload a profile image to S3 bucket
	 * @param {*} uniqueFilename 
	 * @param {*} buffer 
	 * @param {*} mimetype 
	 */
	async uploadProfileImage(uniqueFilename, buffer, mimetype) {
		//Sharp-processed image buffer
		let imgBuffer = await sharp(buffer)
			//.resize(320, 320)
			.resize({
				fit: sharp.fit.contain,
				width: 600
			})
			.jpeg({ quality: 80 })
			.withMetadata()
			.toBuffer();
		//Upload image to S3 bucket
		this.upload(imgBuffer, uniqueFilename, mimetype);
		return uniqueFilename;
	}


	/**
	 * Delete a profile image from S3 bucket
	 * @param {*} filename 
	 */
	deleteProfileImage(filename) {
		this.deleteFile(filename);
	}


	/**
	 * Generate a unique filename for an S3 file
	 * @param {*} oldFilename 
	 * @returns The unique filename
	 */
	generateUniqueFilename(oldFilename) {
		return Date.now() + Math.random().toString(24).slice(2, 12) + path.extname(oldFilename);
	}



	/**
	 * Upload file to S3 bucket
	 * @param {*} buffer 
	 * @param {*} filename 
	 * @param {*} mimetype 
	 */
	upload(buffer, filename, mimetype) {
		console.log("uploading file");
		console.log(buffer);
		console.log(filename);
		console.log(mimetype);
		console.log("uploading file");
		//Upload options
		const uploadParams = {
			Bucket: bucketName,
			Body: buffer,
			Key: filename + mimetype,
			ContentType: mimetype,
			ACL: 'public-read'
		};
		//Upload
		this.s3.upload(uploadParams, () => {
		}, (err) => {
			console.log(err);
		});
	}


	/**
	 * Delete file from S3 bucket
	 * @param {*} filename 
	 */
	deleteFile(filename) {
		console.log("deleting file");
		//Delete options
		const deleteParams = {
			Bucket: bucketName,
			Key: filename
		};
		//Delete
		this.s3.deleteObject(deleteParams, () => { }, (err) => {
			console.log("s3 delete failed");
			console.log(err);
		});


	}



}


//Export S3Utilities
module.exports = new S3Utilities();