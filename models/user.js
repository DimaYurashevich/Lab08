module.exports = (Sequelize, sequelize) =>{
     return sequelize.define('user', {
        login:{
            type: Sequelize.STRING,
            primaryKey: true
        },
        password:{
            type: Sequelize.STRING,
            allowNull: false
        },
        surname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        firstname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        patronymic: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
}