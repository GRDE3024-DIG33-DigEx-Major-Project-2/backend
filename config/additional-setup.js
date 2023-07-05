/**
 * Additional setup for Sequelize tables
 */

//Contains functions for setting up the database schema
class AdditionalSetup {

/**
 * Joins SQL table definitions by associations
 * @param {*} sequelize Sequelize instance for connecting to database
 */
AddAssociations(sequelize) {

    //Defined models in Sequelize instance
    const { 
      Organizer, 
      Attendee,
      Act,
      Event,
      EventImage,
      Performer, 
      TicketType,
      Tag,
    } = sequelize.models;
  
  
    //EXAMPLE
  //   Man.hasOne(RightArm);      // ManId in RigthArm
  //   RightArm.belongsTo(Man);   // ManId in RigthArm
  
    //Organizer-Event
    Organizer.hasMany(Event); //No FK
    Event.belongsTo(Organizer); //Has FK
    //Attendee-Event
    Attendee.belongsToMany(Event, {through:'FavouritedBy'}); //Junction table for Many-to-Many
    Event.belongsToMany(Attendee, {through:'FavouritedBy'});
    //Event-Image
    Event.hasMany(EventImage);
    EventImage.belongsTo(Event);
    //Event-Act
    Event.belongsToMany(Act, {through:'EventActs'});
    Act.belongsToMany(Event, {through:'EventActs'});
    //Act-Performer
    Act.belongsToMany(Performer, {through:'ActPerformers'});
    Performer.belongsToMany(Act, {through:'ActPerformers'}); 
    //Event-TicketType
    Event.hasMany(TicketType);
    TicketType.belongsTo(Event);
    //Event-Tag
    Event.belongsToMany(Tag, {through:'TaggedWith'}); //Junction table for Many-to-Many
    Tag.belongsToMany(Event, {through:'TaggedWith'});
  
  }



  // /**
  //  * Seed dummy data to database
  //  */
  // async SeedData(sequelize) {

  //   //Defined models in Sequelize instance
  //   const { 
  //     Organizer, 
  //     Attendee,
  //     Act,
  //     Event,
  //     EventImage,
  //     Performer, 
  //     TicketType,
  //     Tag,
  //   } = sequelize.models;



  //   //TODO continue

  //   await Attendee.create({
  //     firstName:"Name",
  //     lastName:"Surname",
  //     bio:"bio",
  //     dob:"01/01/2000",
  //     email:"test1@attendee.com",
  //     password:"abc123",
  //     imgUrl:""
  // });



    
  // }





}



module.exports = new AdditionalSetup();



