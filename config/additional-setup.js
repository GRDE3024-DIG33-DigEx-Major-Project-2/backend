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
      Article,
      Blog,
      Event,
      ArticleImage,
      EventImage,
      Performer, 
      TicketType,
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
    //Event-Blog
    Event.hasMany(Blog);
    Blog.belongsTo(Event);
    //Event-Image
    Event.hasMany(EventImage);
    EventImage.belongsTo(Event);
    //Event-Act
    Event.belongsToMany(Act, {through:'EventActs'});
    Act.belongsToMany(Event, {through:'EventActs'});
    //Act-Performer
    Act.belongsToMany(Performer, {through:'ActPerformers'});
    Performer.belongsToMany(Act, {through:'ActPerformers'}); 
    //Act-Article
    Act.belongsToMany(Article, {through:'ActArticles'});
    Article.belongsToMany(Act, {through:'ActArticles'});
    //Article-Images
    Article.hasMany(ArticleImage);
    ArticleImage.belongsTo(Article);
    //Event-TicketType
    Event.hasMany(TicketType);
    TicketType.belongsTo(Event);

  
  }



  // AddEventHandling() {
    
  // }





}



module.exports = new AdditionalSetup();



