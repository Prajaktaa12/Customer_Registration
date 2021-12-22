let express = require("express"); //INITIALIZING EXPRESS
let model = require("../../db/schema/customer"); //IMPORTING MODEL
let router = express.Router(); //IMPORTING ROUTER
let admin = require("../../middleware/admin");
let customerMiddleware = require("../../middleware/customer")

//ADMIN ACCESS TO CHECK CUSTOMER DATA :

//BY ID
router.get("/customer/:id", [customerMiddleware,admin], (async(req,res) => {
    let data = await model.findById(req.params.id);
      res.send(data);
  }));

  //BY REGISTRATION DATE
  router.get("/customer/:registrationDate", [customerMiddleware,admin], (async(req,res) => {
     let data = await model.findById(req.params.registrationDate);
      res.send(data);
  }));

  module.exports = router;