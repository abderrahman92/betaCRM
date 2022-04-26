
const tutorials = require("../controllers/societe.controllers");
module.exports = function(app) {
// Retrieve all Tutorials
app.get("/admin", tutorials.findAll);
//route all societe where role is cemeca 
app.get("/cemeca", tutorials.findAll_cemeca);
//route all societe where role is sofitech  
app.get("/sofitech", tutorials.findAll_sofitech);
//route ajouter societer 
app.post("/api/auth/ajouter", tutorials.create_societe);
};

 