const role = require("../controllers/role.controlleur");

module.exports = function(app) {
 
  
  app.get("/api/auth/role", role.findAll);
  
  
};
