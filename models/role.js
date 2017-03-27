module.exports = (Sequelize, sequelize) =>{
     return sequelize.define('role', {
        name: {
            type: Sequelize.STRING,
            primaryKey: true
        }
    });
}