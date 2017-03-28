module.exports = (Sequelize, sequelize) =>{
     return sequelize.define('domain', {
         id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        domain:{
            type: Sequelize.STRING,
            allowNull: false
        },
        ip:{
            type: Sequelize.STRING,
            allowNull: false
        },
        statusPay:{
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });
}