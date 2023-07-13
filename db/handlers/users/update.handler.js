/**
 * Update user db handler
 * 
 */

const enumUtil = require("../../../util/enum.util");
const { db } = require("../../../db/models/db");
//Load required db models for querying
const {Organizer, Attendee} = db.models;


class UpdateUserHandler {



	constructor() {

	}



	//TODO WOULD NEED TO CHANGE UPDATE SLIGHTLY IF I WANT TO DO PROFILE PICTURE FUNCTIONALITY

	async Update(newData, profileImgFilename, currUser, t) {
		let user;
		console.log("Beginning user update");

		if (currUser.userType == enumUtil.userTypes.attendee)
		user = await this.UpdateAttendee(newData, currUser, t);
		else if (currUser.userType == enumUtil.userTypes.organizer)
		user = await this.UpdateOrganizer(newData, currUser, t);

		return user;
	}

	/**
     * Update Attendee table row
     * @param {*} newData 
     * @param {*} currUser 
     * @param {*} transaction 
     * @returns The updated attendee in db
     */
			async UpdateAttendee(newData, currUser, transaction) {

				let updatedUser;
				console.log("Updating Attendee");
		
				await Attendee.update(newData,
					{
						transaction: transaction,
						where: {
							id: currUser.id
						}
					})
					.then(async () => {
						//Return the updated attendee row
						await Attendee.findByPk(currUser.id)
							.then((value) => {
								updatedUser = value.dataValues;
							});
					});
				return updatedUser;
			}

	/**
     * Update Organizer table row
     * @param {*} newData 
     * @param {*} currUser 
     * @param {*} transaction 
     * @returns The updated organizer in db
     */
		async UpdateOrganizer(newData, currUser, transaction) {

			let updatedUser;
			console.log("Updating Organizer");
	
			await Organizer.update(newData,
				{
					transaction: transaction,
					where: {
						id: currUser.id
					}
				})
				.then(async () => {
					//Return the updated organizer row
					await Organizer.findByPk(currUser.id)
						.then((value) => {
							updatedUser = value.dataValues;
						});
				});
			return updatedUser;
		}





}


//Export handler
module.exports = new UpdateUserHandler();