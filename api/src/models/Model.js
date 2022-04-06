const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("model", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    razon_social: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
