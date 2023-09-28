const express = require('express');
const router = express.Router();
const Plant = require('../models/plantModel');

router.post('/plants', async (req, res) => {
  try {
    const newPlant = await Plant.create(req.body);
    res.status(201).json(newPlant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create plant' });
  }
});

router.get('/plants/:id', async (req, res) => {
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
});

router.get('/plants', async (req, res) => {
  try {
    const plants = await Plant.findAll();
    res.json(plants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get plants' });
  }
});

router.put('/plants/:id', async (req, res) => {
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
});

router.delete('/plants/:id', async (req, res) => {
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
});

module.exports = router;
