const express = require('express');
const router = express.Router();
const knex = require('../db');

router.get('/', (req, res, next) => {
    knex('shelves')
    .select('*')
    .then(shelves => res.json(shelves))
    .catch(err => next(err))
});

module.exports = router;