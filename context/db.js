module.exports = (Sequelize, config) => {
    const options = {
        host: config.db.host,
        dialect: 'mysql',
        logging: false
    };

    const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, options);

    const Role = require('../models/role')(Sequelize, sequelize);
    const User = require('../models/user')(Sequelize, sequelize);

    User.belongsToMany(Role,{ through: UserRole });
    Role.belongsToMany(User,{ through: UserRole });
    
    return {
        role: Role,
        user: User,

        sequelize: sequelize
    }
}
