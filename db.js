const Sequelize = require('sequelize')

const sequelize = new Sequelize('teloregaloDB','postgres','1234',{
    host: 'localhost',
    dialect: 'postgres',
})

const User = sequelize.define("user",{
    nombre:  Sequelize.STRING,
    email:   Sequelize.STRING,
    password: Sequelize.STRING,
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }
})
const Publicacion = sequelize.define("publicacion",{
    nombreProducto:  Sequelize.STRING,
    Titulo:   Sequelize.STRING,
    url: Sequelize.STRING,
    descripcion: Sequelize.STRING,
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }
})

User.hasMany(Publicacion);
Publicacion.belongsTo(User);
   