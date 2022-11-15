const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db/mydb.db'
});

const db = { };

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
});

module.exports = db;
