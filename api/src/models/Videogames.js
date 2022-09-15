const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  //UUID:  Universally Unique IDentifier(Permiten reconocer e distinguir un objeto dentro de un sisema, o el mismo objeto en diferentes contextos)
  sequelize.define('videogames', {
    id: {
      type: DataTypes.UUID, //se genera en el momento
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4 // genera UUIDV4 Automaticamente
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image:{
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    released: {
      type: DataTypes.TEXT(8)
    },
    rating: {
      type: DataTypes.DECIMAL(10,1),
      validate: {
        min: 0,
        max: 5
      }
    },
    createdAtDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    timestamps: false,
  });
};
