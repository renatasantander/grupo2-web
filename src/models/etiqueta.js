const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Etiqueta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Tarea, {
        foreignKey: 'tareaId',
      });
    }
  }
  Etiqueta.init({
    nombre: DataTypes.STRING,
    tareaId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Etiqueta',
  });
  return Etiqueta;
};
