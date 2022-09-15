const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  //UUID:  Universally Unique IDentifier(Permiten reconocer e distinguir un objeto dentro de un sisema, o el mismo objeto en diferentes contextos)
  sequelize.define('genres', {
    name: {
      type: DataTypes.STRING
    }
  },{
    timestamps: false
  });
};