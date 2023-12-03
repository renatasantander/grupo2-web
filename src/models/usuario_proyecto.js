/* eslint-disable camelcase */

const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuario_Proyecto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Usuario, {
        foreignKey: 'usuarioId',
      });
      this.belongsTo(models.Proyecto, {
        foreignKey: 'proyectoId',
      });
    }
  }
  Usuario_Proyecto.init({
    rol: DataTypes.STRING,
    usuarioId: DataTypes.INTEGER,
    proyectoId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Usuario_Proyecto',
  });
  return Usuario_Proyecto;
};
