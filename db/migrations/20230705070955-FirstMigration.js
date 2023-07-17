/**
 * Migrations file for database schema tables
 */

"use strict";

//Enum utils for use in defining table columns
const enumUtil = require("../../util/enum.util");
const DataTypes = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  //Perform Migration
  async up(queryInterface, Sequelize) {
    //Create the Act table
    await queryInterface.createTable("Act", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    //Create the Attendee table
    await queryInterface.createTable("Attendee", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        isEmail: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imgFilename: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      userType: {
        type: DataTypes.STRING,
        defaultValue: enumUtil.userTypes.attendee,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    //Create the Organizer table
    await queryInterface.createTable("Organizer", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      organizationName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        isEmail: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imgFilename: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      userType: {
        type: DataTypes.STRING,
        defaultValue: enumUtil.userTypes.organizer,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    //Create the Event table
    await queryInterface.createTable("Event", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      OrganizerId: {
        type: DataTypes.UUID,
        primaryKey: false,
        references: {
          model: "Organizer",
          key: "id",
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      venueName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      summary: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      region: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postcode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isFree: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      purchaseUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: enumUtil.eventStatus.upcoming,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    //Create the EventImage table
    await queryInterface.createTable("EventImage", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      EventId: {
        type: DataTypes.UUID,
        primaryKey: false,
        references: {
          model: "Event",
          key: "id",
        },
      },
      filename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    //Create the TicketType table
    await queryInterface.createTable("TicketType", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    //Create the Tag table
    await queryInterface.createTable("Tag", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    //Create the EventAct junction table
    await queryInterface.createTable("EventAct", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      EventId: {
        type: DataTypes.UUID,
        primaryKey: false,
        references: {
          model: "Event",
          key: "id",
        },
      },
      ActId: {
        type: DataTypes.UUID,
        primaryKey: false,
        references: {
          model: "Act",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    //Create the EventTicket junction table
    await queryInterface.createTable("EventTicket", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      EventId: {
        type: DataTypes.UUID,
        primaryKey: false,
        references: {
          model: "Event",
          key: "id",
        },
      },
      TicketTypeId: {
        type: DataTypes.UUID,
        primaryKey: false,
        references: {
          model: "TicketType",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    //Create the FavouritedBy junction table
    await queryInterface.createTable("FavouritedBy", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      EventId: {
        type: DataTypes.UUID,
        primaryKey: false,
        references: {
          model: "Event",
          key: "id",
        },
      },
      AttendeeId: {
        type: DataTypes.UUID,
        primaryKey: false,
        references: {
          model: "Attendee",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    //Create the TaggedWith junction table
    await queryInterface.createTable("TaggedWith", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      EventId: {
        type: DataTypes.UUID,
        primaryKey: false,
        references: {
          model: "Event",
          key: "id",
        },
      },
      TagId: {
        type: DataTypes.UUID,
        primaryKey: false,
        references: {
          model: "Tag",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  //Revert Migration -- Force drop all tables
  async down(queryInterface, Sequelize) {
    await queryInterface.dropAllTables();
  },
};
