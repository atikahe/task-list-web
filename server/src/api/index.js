const express = require('express');

const emojis = require('./emojis');

const task = require('./task');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/task', task);

module.exports = router;
