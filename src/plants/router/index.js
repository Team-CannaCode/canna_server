'use strict';

const express = require('express');
const plantRouter = express.Router();

const bearerAuth = require('../middleware/bearer.js');
const {
  createPlant,
  getPlant,
  getPlants,
  updatePlant,
  deletePlant
} = require('./handlers.js');

plantRouter.post('/plant', createPlant);
plantRouter.get('/plant', bearerAuth, getPlant);
plantRouter.get('/plants', bearerAuth, getPlants);
plantRouter.update('/plant/:id', bearerAuth, updatePlant);
plantRouter.deletePlant('/plant/:id', bearerAuth, deletePlant);

module.exports = authRouter;