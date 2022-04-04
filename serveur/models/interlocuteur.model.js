module.exports =(sequelize,Sequelize)=>{
  const Interlocuteur = sequelize.define("Interlocuteur",{
    id_interlocuteur: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    nom: {
      type: Sequelize.STRING
    },
    prenom: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    adresse: {
      type: Sequelize.STRING
    },
    code_postale:{
      type:Sequelize.STRING
    },
    tel: {
      type: Sequelize.STRING
    },
    activite: {
      type: Sequelize.INTEGER
    }
  });
  return Interlocuteur;
};
