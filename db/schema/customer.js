let mongoose = require("mongoose"); //INITIALIZING MONGOOSE
const jwt = require("jsonwebtoken");
const config = require("config");

//CREATING SCHEMA
let customerSchema = new mongoose.Schema({
  customerName: { type: String, min: 3, max: 30, required: true },
  customerAddress: { type: String, min: 3, max: 50, required: true },
  customerPhoto: {type: String},
  contactNo: { type: Number, required: true },
  customerEmailId: {type: String, min:4, max:50, required:true},
  customerPassword: {type: String, unique:true, min:4, max:50, required:true},
  registrationDate: { type: Date, default: new Date()},
  isAdmin: {type: Boolean}
});

customerSchema.methods.JwtToken = function() {
  let token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get("password"));
  return token;
};

//CREATING MODEL
let customerModel = mongoose.model("customerDetails", customerSchema);
//EXPORTING MODEL
module.exports = customerModel;