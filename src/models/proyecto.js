const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Proyecto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasMany(models.Usuario_Proyecto, {
      //   foreignKey: 'id',
      // });
      this.belongsToMany(models.Usuario, {
        through: 'Usuario_Proyecto',
        foreignKey: 'proyectoId',
        onDelete: 'CASCADE',
      });
      this.hasMany(models.Tarea, {
        foreignKey: 'proyectoId',
        onDelete: 'CASCADE',
      });
    }
  }
  Proyecto.init({
    titulo: DataTypes.STRING,
    estado: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Proyecto',
  });
  return Proyecto;
};
