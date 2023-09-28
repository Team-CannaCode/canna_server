const { Plant } = require('../models/plantModel');

async function createPlant (req, res, next) {
  try {
    const newPlant = await Plant.create(req.body);
    res.status(201).json(newPlant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create plant' });
  }
};

async function getPlant (req, res, next) {
  const plantId = req.params.id;
  try {
    const plant = await Plant.findByPk(plantId);
    if (!plant) {
      return res.status(404).json({ error: 'Plant not found' });
    }
    res.json(plant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get plant' });
  }
};

async function getPlants (req, res, next) {
  try {
    const plants = await Plant.findAll();
    res.json(plants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get plants' });
  }
};

async function updatePlant (req, res, next) {
  const plantId = req.params.id;
  try {
    const [updatedRowsCount] = await Plant.update(req.body, {
      where: { id: plantId },
    });
    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: 'Plant not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update plant' });
  }
};

async function deletePlant (req, res) {
  const plantId = req.params.id;
  try {
    const deletedRowCount = await Plant.destroy({
      where: { id: plantId },
    });
    if (deletedRowCount === 0) {
      return res.status(404).json({ error: 'Plant not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete plant' });
  }
};

module.exports = {
  createPlant,
  getPlant,
  getPlants,
  updatePlant,
  deletePlant
};
