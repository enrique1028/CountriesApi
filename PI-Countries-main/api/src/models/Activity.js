//const sequelize = require('sequelize');
const {DataTypes} = require('sequelize');

const Activity = (sequelize) =>{
    sequelize.define("activity", {
        name: {
            type: DataTypes.STRING,
          },
        difficulty: {
            type: DataTypes.INTEGER,
            validate: {min:1, max:5},
          },
        duration: {
            type: DataTypes.INTEGER,
          },
        season: {
            type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera'),
          },
    },
    {
      timestamps: false,
    }
    );  
      
};

module.exports = Activity
