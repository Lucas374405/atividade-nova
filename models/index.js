const sequelize = require('../config/bd');

const { Jogo } = require('./Jogo.model');
const { desenvolvedoras } = require('./desenvolvedoras.model');
const { genero } = require('./genero.model');

desenvolvedoras.belongsToMany(Jogo, {
    through: 'creditos',
    foreignKey: 'devID',
    otherKey: 'JogoID',
    as: 'jogos'
});

Jogo.belongsToMany(desenvolvedoras, {
    through: 'creditos',
    foreignKey: 'JogoID',
    otherKey: 'devID',
    as: 'desenvolvedoras'
});

genero.hasMany(Jogo, {
    foreignKey: 'generoID',
    as: 'jogos'
});

Jogo.belongsTo(genero, {
    foreignKey: 'generoID',
    as: 'genero'
});

module.exports = {
    sequelize,
    Jogo,
    desenvolvedoras,
    genero
};