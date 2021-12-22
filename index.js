//INITIALIZING ALL THE REQUIRED MODULES
let express = require("express");
let mongoose = require("mongoose");
let app = express();
let config = require("config");
let login = require("./middleware/login")
let customer = require("./routes/api/customer");
let admin = require("./routes/api/admin");
let port = process.env.PORT || 4500; //INITIALIZING PORT THAT IS TO BE USED

console.log(`NODE_ENV MODE: ${process.env.NODE_ENV}`);
console.log(`app : ${app.get("env")}`);
console.log(`name : ${config.get("name")}`);
console.log(`mode : ${config.get("mode")}`);
//console.log(`password : ${config.get("password")}`);
app.use(express.json());
app.use("/api", customer);
app.use("/api", admin);
app.use("/api", login);

if (!config.get("password")) {
  console.log("ACCESS DENIED");
  process.exit(1);
}

//INITIALIZING MONGOOSE CONNECTION
mongoose
  .connect("mongodb://localhost/customerRegistration", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to db"))
  .catch((error) => console.log(`something went wrong ${error.message}`));
app.listen(port, () => console.log(`port is working on ${port}`));