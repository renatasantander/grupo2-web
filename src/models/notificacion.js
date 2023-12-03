const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Notificacion extends Model {
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
    }
  }
  Notificacion.init({
    tipo: DataTypes.STRING,
    mensaje: DataTypes.STRING,
    leido: DataTypes.BOOLEAN,
    proyecto: DataTypes.INTEGER,
    usuarioId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Notificacion',
  });
  return Notificacion;
};
