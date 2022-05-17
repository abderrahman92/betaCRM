//route ajouter societer 
const Action = require("../controllers/actions.controllers");

module.exports = function(app) {
 
  
  app.post("/api/auth/action", Action.create_action);
  
  
};
