const { DataTypes } = require('sequelize')

const Sequelize = require('../config/bd.js')

const desenvolvedoras = Sequelize.define(
    'desenvolvedoras',
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },

        capital: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'Desenvolvedoras',
        timestamps: true
    }
)

module.exports = { desenvolvedoras }