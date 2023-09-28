const jwt = require("jsonwebtoken"); // Import the jsonwebtoken library
const { DataTypes } = require("sequelize"); // Import DataTypes from Sequelize

const plantModel = (sequelize) => {
  const Plant = sequelize.define('Plant', {
    plantName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    plantStrain: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Define a virtual property for the token
  Plant.prototype.getToken = function () {
    const SECRET = "your-secret-key"; // Replace with your actual secret key
    return jwt.sign({ plantName: this.plantName }, SECRET);
  };

  return Plant;
};

module.exports = plantModel;
