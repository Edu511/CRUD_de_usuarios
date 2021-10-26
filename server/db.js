const Sequelize = require('sequelize');

const UsuarioModel = require('./models/usuarios');

const sequelize = new Sequelize('DGsN0MuZ0d', 'DGsN0MuZ0d', 'c4V8MhrVjU', {
    host: 'remotemysql.com',
    dialect: 'mysql'
});

const Usuario = UsuarioModel(sequelize, Sequelize);

sequelize.sync({ force: false})
    .then(() => {
    console.log('Tablas sincronizadas');
    })

module.exports = {
    Usuario
}