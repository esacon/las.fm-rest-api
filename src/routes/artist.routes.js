const express = require('express');
const router = express.Router();

const Artist = require('../controllers/artist.controller');

router.get('/', Artist.fetchArtist);

module.exports = router;