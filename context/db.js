module.exports = (Sequelize, config) => {
    const options = {
        host: config.db.host,
        dialect: 'mysql',
        logging: false
    };

    const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, options);
    
    const Domain= require('../models/domain')(Sequelize, sequelize);
    const User = require('../models/user')(Sequelize, sequelize);

    User.hasMany(Domain);
    Domain.belongsTo(User);
    
    return {
        domain: Domain,
        user: User,

        sequelize: sequelize
    }
}
