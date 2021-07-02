const express = require('express');

const Routine = require('../models/routineSchema');

const router = express.Router();

router.get('/routine', async (req, res) => {
  try {
    const routines = await Routine.find({});
    res.send(routines);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/routine/create', async (req, res) => {
  const routine = new Routine({
    ...req.body
  });
  try {
    await routine.save();
    res.send(routine);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch('/routine/update', async (req, res) => {
  try {
    const routine = await Routine.findOne({
      _id: req.body._id
    });
    if (!routine) {
      return res.status(400).send({ error: 'Invalid param!' });
    }
    const routineUpdates = Object.keys(req.body);
    const updateFields = routineUpdates.filter(item => {
      return item !== '_id';
    });
    updateFields.forEach(
      routineEachProperty =>
        (routine[routineEachProperty] = req.body[routineEachProperty])
    );
    routine.save();
    res.send(routine);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/routine/delete/:id', async (req, res) => {
  try {
    const routine = await Routine.findOneAndDelete({
      _id: req.params.id
    });
    if (!routine) {
      return res.status(404).send({ error: 'Invalid param!' });
    }
    res.send(routine);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
