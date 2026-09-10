const { DataTypes } = require('sequelize');

const Sequelize = require('../config/bd.js');

const genero = Sequelize.define(
    'genero',
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'Generos',
        timestamps: true
    }
);

module.exports = { genero };