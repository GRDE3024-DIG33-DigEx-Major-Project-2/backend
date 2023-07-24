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
    const { Organizer, Attendee, Act, Event, EventImage, TicketType, Tag } =
      sequelize.models;

    //Organizer-Event
    Organizer.hasMany(Event, {
      onDelete: "cascade",
    }); //No FK
    Event.belongsTo(Organizer); //Has FK

    //Attendee-Event
    Attendee.belongsToMany(Event, {
      through: "FavouritedBy",
      onDelete: "cascade",
    }); //Junction table for Many-to-Many
    Event.belongsToMany(Attendee, { through: "FavouritedBy" });

    //Event-Image
    Event.hasMany(EventImage);
    EventImage.belongsTo(Event);

    //Event-Act
    Event.belongsToMany(Act, { through: "EventAct" });
    Act.belongsToMany(Event, { through: "EventAct" });

    //Event-TicketType
    Event.belongsToMany(TicketType, {
      through: "EventTicket",
    }); //Junction table for Many-to-Many

    //Event-Tag
    Event.belongsToMany(Tag, { through: "TaggedWith" }); //Junction table for Many-to-Many
    Tag.belongsToMany(Event, { through: "TaggedWith" });
  }

  /**
   * Adds hooks to Sequelize model definitions
   * @param {*} sequelize
   */
  AddHooks(sequelize) {
    //Defined models in Sequelize instance
    const { Organizer, Attendee } = sequelize.models;

    //Add hook to not return password on user creation
    Attendee.addHook("afterCreate", (record) => {
      delete record.dataValues.password;
    });
    Organizer.addHook("afterCreate", (record) => {
      delete record.dataValues.password;
    });
    //Add hook to not return password on user update
    Attendee.addHook("afterUpdate", (record) => {
      delete record.dataValues.password;
    });
    Organizer.addHook("afterUpdate", (record) => {
      delete record.dataValues.password;
    });
  }
}

module.exports = new AdditionalSetup();
