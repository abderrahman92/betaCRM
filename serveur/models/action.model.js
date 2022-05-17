
module.exports =(sequelize,Sequelize)=>{
  const Action = sequelize.define("actions",{
    id_action: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    date_action: {
      type: Sequelize.DATE,
    },
    description: {
      type: Sequelize.STRING
    },
    date_rdv: {
      type: Sequelize.DATE,
    }
    
  });
  return Action;
};
