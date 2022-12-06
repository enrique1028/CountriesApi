const { DataTypes } = require('sequelize');

//module.exports = (sequelize)
const Country = (sequelize) => {
  //definición del modelo
  sequelize.define('country', {
    id: {
      type: DataTypes.STRING(3), 
      allowNull: false,
      primaryKey: true,
      },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flag:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    continent:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital:{
      type: DataTypes.STRING,
    },
    region:{
      type: DataTypes.STRING,
    },
    area:{
      type: DataTypes.INTEGER,
    },
    population:{
      type: DataTypes.INTEGER,
    },
    subregion:{
      type: DataTypes.STRING,
    },
  },
  {
    timestamps:false,
  }
  );
};

module.exports = Country