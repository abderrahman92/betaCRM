const db = require("../models");
const Interlocuteur = db.interlocuteur;
const Op = db.Sequelize.Op;
// Create and Save a new Societes
exports.create_action = (req, res) => {
  // Create a societes
  const insert = {
    nom:req.body.nom,
    prenom:req.body.prenom,
    email:req.body.email,
    adresse:req.body.adresse,
    code_postale:req.body.code_postale,
    tel:req.body.tel,
    fonction_inter:req.body.fonction_inter,
    id_soc:req.body.id_soc,
   
  };
  
  console.log(insert)
  console.log(Interlocuteur)
  // Save Tutorial in the database
  Interlocuteur.create(insert)
    .then(data => {
      res.send({message:'Interlocuteur ajouter avec succée ',data});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};
// trouver tous les interlocuteur 
exports.findAll = (req, res) => {
  Interlocuteur.findAll().then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

