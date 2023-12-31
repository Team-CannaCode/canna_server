'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const plantModel = require('./plantModel.js');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? { 
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  },
  logging: false
} : {logging: false};

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);

module.exports = {
  db: sequelize,
  plants: plantModel(sequelize, DataTypes),
};