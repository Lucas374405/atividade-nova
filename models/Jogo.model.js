const { DataTypes } = require('sequelize');
const Sequelize = require('../config/bd.js');

const Jogo = Sequelize.define(
    'Jogo',
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        anoDeLancamento: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        generoID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        avaliacao: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
    {
        tableName: 'Jogos',
        timestamps: true
    }
);

module.exports = { Jogo };