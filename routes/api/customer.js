let express = require("express"); //INITIALIZING EXPRESS
let Joi = require("@hapi/joi"); //FOR VALIDATION INITIALIZING HAPI-JOI
let model = require("../../db/schema/customer"); //IMPORTING MODEL
let router = express.Router(); //IMPORTING ROUTER
let bcrypt = require("bcrypt");

//CUSTOMER REGISTRATION API
router.post("/customerRegistration", async (req, res) => {
    let customer = await model.findOne({ "customerEmailId": req.body.customerEmailId });
    //console.log(customer);
if(customer) {return res.status(403).send({message:"EmailId already exists"})}    
  let { error } = ValidationError(req.body);
  if (error) {
    return res.send(error.details[0].message);
  }
  let newData = new model({
    customerName: req.body.customerName,
    customerAddress: req.body.customerAddress ,
    customerPhoto: req.body.customerPhoto,
    contactNo: req.body.contactNo,
    customerEmailId: req.body.customerEmailId,
    customerPassword: req.body.customerPassword, 
    registrationDate: req.body.registrationDate,
    isAdmin: req.body.isAdmin
  });
  let salt = await bcrypt.genSalt(10);
    newData.customerPassword = await bcrypt.hash(newData.customerPassword, salt);
    let token = newData.JwtToken();
    let data = await newData.save();
    res.header("x-auth-token", token).send({ message: "Thank you for registration", data});
});


//VALIDATION OF CUSTOMER DATA
function ValidationError(error) {
  let Schema = Joi.object({
    customerName: Joi.string().min(3).max(30).required(),
    customerAddress: Joi.string().min(3).max(50).required(),
    customerPhoto: Joi.string(),
    contactNo: Joi.number().integer().min(1000000000).max(9999999999).required(),
    customerEmailId: Joi.string().required().email(),
    customerPassword: Joi.string().required(),
    registrationDate: Joi.date(),
    isAdmin: Joi.boolean(),
  });
  return Schema.validate(error);
}

//EXPORTING MODULE ROUTER
module.exports = router;