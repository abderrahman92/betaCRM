
module.exports =(sequelize,Sequelize)=>{
    const historique_auth = sequelize.define("historique_auth",{
      username: {
        type: Sequelize.INTEGER
      },
      password: {
        type: Sequelize.STRING
      },
      message: {
        type: Sequelize.STRING
      },
      date_connection: {
        type: Sequelize.DATE
      },

    });
    return historique_auth;
  };