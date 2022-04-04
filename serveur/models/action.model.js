
module.exports =(sequelize,Sequelize)=>{
  const Action = sequelize.define("actions",{
    id_action: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    date_action: {
      type: Sequelize.INTEGER
    },
    date_rdv: {
      type: Sequelize.STRING
    }
    
  });
  return Action;
};
