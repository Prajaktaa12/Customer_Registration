let express = require("express");
let router = express.Router();
let bcrypt = require("bcrypt");
let model = require("../db/schema/customer");

//USER LOGIN
router.post("/login", async (req, res) => {
    let user = await model.findOne({ "customerEmailId": req.body.customerEmailId });
    if (!user) { return res.status(404).send({ message: "Invalid email id" }) }
    let validpassword = await bcrypt.compare(req.body.customerPassword, user.customerPassword);
    if (!validpassword) { return res.status(404).send({ message: "Invalid password" }) };
    let token = user.JwtToken();
    res.header("x-auth-token", token).send({ message: "LOGIN DONE"});
    
});

module.exports = router;