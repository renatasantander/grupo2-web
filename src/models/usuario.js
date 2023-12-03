const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
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
      this.belongsToMany(models.Proyecto, {
        through: 'Usuario_Proyecto',
        foreignKey: 'usuarioId',
        onDelete: 'CASCADE',
      });
      this.hasMany(models.Notificacion, {
        foreignKey: 'usuarioId',
        onDelete: 'CASCADE',
      });
      this.hasMany(models.Tarea, {
        foreignKey: 'usuarioId',
        onDelete: 'CASCADE',
      });
    }
  }
  Usuario.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: {
          msg: 'Nombre de usuario ingresado debe ser alfanumérico',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        isValidPassword(value) {
          if (!value.match(/[a-z]/) || !value.match(/[0-9]/) || !value.match(/[@$!%*?$]/)) {
            throw new Error('La contraseña debe contener al menos una letra, un caracter especial y un número');
          }
        },
      },
    },
    mail: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Email ingresado debe tener formato email',
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};
