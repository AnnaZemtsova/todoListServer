const Sequelize = require('sequelize')

const database = new Sequelize({
    database: 'users',
    dialect: 'postgres',
    operatorsAliases: Sequelize.Op
});

const Users = database.define('users', {
    id: { type: Sequelize.DataTypes.UUID, primaryKey: true },
    name: { type: Sequelize.DataTypes.STRING, allowNull: false },
    email: { type: Sequelize.DataTypes.STRING, allowNull: false },
    password: { type: Sequelize.DataTypes.STRING, allowNull: false }
});

const Todos = database.define('todoList', {
    id: { type: Sequelize.DataTypes.UUID, primaryKey: true, allowNull: false },
    idUser: { type: Sequelize.DataTypes.UUID,  allowNull: false },
    todo: { type: Sequelize.DataTypes.STRING,  allowNull: false }
});


Todos.belongsTo(Users, {
    foreignKey: { allowNull: false },
    onDelete: 'cascade'
});

module.exports = {
    Todos,
    Users,
    database
};
