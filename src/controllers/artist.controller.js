const LASTFM_API = process.env.LASTFM_API;
const API_KEY = process.env.API_KEY;
const axios = require('axios');

const getRandomArtist = () => {
    const randomIndex = Math.floor(Math.random() * sampleArtist.length);
    return sampleArtist[randomIndex];
}

const retrieveResult = async (artist) => {
    return
}

const fetchArtist = async (req, res) => {
    return
}

module.exports = {
    fetchArtist
}