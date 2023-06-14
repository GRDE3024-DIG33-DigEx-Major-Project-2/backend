/**
 * Test controller
 * 
 * Author: Team X
 */



//Test controller with actions for route endpoints
class TestController {


    TestMessage = async(req, res) => {
        console.log("Inside TestMessage controller");
        return res.status(200).json({message:"Hello World!"});
    }

}

//Export the test controller
module.exports = TestController;