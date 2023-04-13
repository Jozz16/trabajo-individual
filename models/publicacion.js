'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publicacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Publicacion.belongsTo(models.User);
      models.User.hasMany(Publicacion);
    }
  }
  Publicacion.init({
    nombreProducto: DataTypes.STRING,
    Titulo: DataTypes.STRING,
    url: DataTypes.STRING,
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Publicacion',
  });
  return Publicacion;
};