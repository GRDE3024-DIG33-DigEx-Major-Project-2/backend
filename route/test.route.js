/**
 * Test route
 * 
 * Author: Team X
 */


//Import dependencies
require("dotenv").config();
const express = require("express");
const router = express.Router();
const TestController = require("../controller/test.controller");
const testController = new TestController();




/**
 * @swagger
 * /test:
 *  get:
 *      description: Get test message
 *      responses:
 *          '200':
 *              description: Test message retrieved successfully
 *              
 */
router.get('/', testController.TestMessage);




//Exports the test router
module.exports = router;