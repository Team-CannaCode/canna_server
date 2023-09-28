const jwt = require("jsonwebtoken"); // Import the jsonwebtoken library
const { DataTypes } = require("sequelize"); // Import DataTypes from Sequelize

const userModel = (sequelize) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Define a virtual property for the token
  User.prototype.getToken = function () {
    const SECRET = "your-secret-key"; // Replace with your actual secret key
    return jwt.sign({ username: this.username }, SECRET);
  };

  return User;
};

module.exports = userModel;
