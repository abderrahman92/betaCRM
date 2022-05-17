const db = require("../models");
const Action = db.action;
const Op = db.Sequelize.Op;
// Create and Save a new Societes
exports.create_action = (req, res) => {
  // Create a societes
  const action = {
    
    
    desciption:"req.body.desciption"
   
  };
  // Save Tutorial in the database
  Action.create({desciption:"req.body.desciption"})
    .then(data => {
      res.send({message:'société ajouter avec succée :)',data});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      ,});
    });
};
