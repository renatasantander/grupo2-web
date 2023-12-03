const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tarea extends Model {
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
      this.hasMany(models.Etiqueta, {
        foreignKey: 'tareaId',
        onDelete: 'CASCADE',
      });
    }
  }
  Tarea.init({
    titulo: DataTypes.STRING,
    fecha: DataTypes.DATE,
    estado: DataTypes.STRING,
    comentario: DataTypes.STRING,
    usuarioId: DataTypes.INTEGER,
    proyectoId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Tarea',
  });
  return Tarea;
};
