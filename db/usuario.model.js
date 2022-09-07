const {DataTypes } = require('sequelize');
const sequelize = require('./sequelize.db');

const USER_TABLE = 'usuarios';

const userSchema = {
    iduser: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    usuario:{
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
    },
    password:{
        allowNull: false,
        type: DataTypes.STRING,
    }

}

const userModel = sequelize.define(USER_TABLE, userSchema);
 module.exports = userModel;