const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to authentification application abderrahmane." });
});

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


const db = require("./models");
const Role = db.role;
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});
function initial() {
  Role.create({
    id: 1,
    name: "cemeca"
  });
 
  Role.create({
    id: 2,
    name: "sofitech"
  });
 
  Role.create({
    id: 3,
    name: "admin_cemaca"
  });
  Role.create({
    id: 4,
    name: "admin_sofitech"
  });
  Role.create({
    id: 5,
    name: "super_cemeca"
  });
  Role.create({
    id: 6,
    name: "super_sofitech"
  });
  Role.create({
    id: 7,
    name: "super_admin1"
  });
  Role.create({
    id: 8,
    name: "super_admin2"
  });
}

