const express = require('express');
const router = express.Router();
const knex = require('../db');

router.get('/', (req, res, next) => {
    knex('libraries')
    .select('*')
    .then(libraries => res.json(libraries))
    .catch(err => next(err))
});

router.get('/:id/shelves', (req, res, next) => {
    const { id } = req.params;

    knex('shelves')
    .select('*')
    .where({ libraryId: id })
    .then(shelves => res.json(shelves))
    .catch(err => next(err))
})

router.get('/:id', (req, res, next) => {
    const { id } = req.params;

    knex('libraries')
    .select('*')
    .where({ id })
    .first()
    .then(library => res.json(library))
    .catch(err => next(err))
})

module.exports = router;