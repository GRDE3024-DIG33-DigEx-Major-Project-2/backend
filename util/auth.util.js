/**
 * Provides auth-related utilities
 */


//Import dependencies
let crypto = require('crypto');
require('dotenv').config();
const jwt = require('jsonwebtoken');


/**
 * Auth-related utilities
 */
class AuthUtils {

	/**
	 * Encrypts the password through a hashing algorithm and salt
	 * @param {*} password The unencrypted password
	 * @returns {String} The encrypted password
	 */
	generateHash(password) {
		const salt = crypto.randomBytes(16).toString('hex');
		const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex');
		return [salt, hash].join('$');
	}


	/**
	 * Verifies password from registration attempt. 
	 * @param {*} password The password attempt from the sign-in attempt data
	 * @param {*} original The encrypted password stored in the database
	 * @returns {boolean} TRUE if password matches, else FALSE
	 */
	verify(password, original) {
		const originalHash = original.split('$')[1];
		const salt = original.split('$')[0];
		const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex');
		return hash === originalHash;
	}


	/**
	 * Generates a JWT that is used for authenticating user
	 * @param {*} user The user requesting the JWT
	 * @returns {String} JWT that identifies the user
	 */
	generateJWT(user) {
		return jwt.sign({
			user: user
		}, process.env.JWTSECRET, {
			expiresIn: '30min'
		});
	}









}




//Export AuthUtils
module.exports = new AuthUtils();