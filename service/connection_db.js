const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize('postgres','postgres','Catateamo123',{
    host: 'db.vaguzihkidgsfbfwbiei.supabase.co',
    dialect: 'postgres',
})

const User = sequelize.define("user",{
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }
})

const Publicacion = sequelize.define("publicacion",{
    nombreProducto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }
})

User.hasMany(Publicacion);
Publicacion.belongsTo(User);


module.exports = { sequelize };