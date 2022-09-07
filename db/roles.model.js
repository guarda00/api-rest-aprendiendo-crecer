const {DataTypes } = require('sequelize');
const sequelize = require('./sequelize.db');
const userModel = require('./usuario.model');

const ROL_TABLE = 'roles';

const rolSchema = {
    id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    nombre:{
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
    }
    
}

const rolModel = sequelize.define(ROL_TABLE, rolSchema);

rolModel.hasMany(userModel,{
    foreignKey: 'rol_id',
    sourceKey: 'id',
});

userModel.belongsTo(rolModel,{
    foreignKey: 'rol_id',
    as: 'fk_rol_id',
    targetId: 'id',
});

module.exports = userModel;