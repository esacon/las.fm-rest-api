const axios = require('axios');
const fs = require('fs');

const sampleArtist = require('../utils/sampleArtists');
const LASTFM_API = process.env.LASTFM_API;
const API_KEY = process.env.API_KEY;

const getRandomArtist = () => {
    const randomIndex = Math.floor(Math.random() * sampleArtist.length);
    return sampleArtist[randomIndex];
}

const saveArtistResult = (results, filename) => {
    const header = 'name,mbid,url,image_small,image\n';
    try {
        if (!fs.existsSync(`./src/files/${filename}.csv`)) {
            fs.appendFileSync(`./src/files/${filename}.csv`, header);
        }
        results.map(res => {
            const { name, mbid, url, image_small, image } = res;
            const row = `${name},${mbid},${url},${image_small},${JSON.stringify(image)}\n`;
            fs.appendFileSync(`./src/files/${filename}.csv`, row);
        });
        console.log(`Results written to ${filename}.csv`);
    } catch (err) {
        console.error(`Error while writing to CSV: ${err}`);
    }
};

const retrieveResult = async (artist) => {
    const URL = `${LASTFM_API}?method=artist.search&artist=${artist}&api_key=${API_KEY}&format=json`;
    try {
        const response = await axios.get(URL);
        const { data } = response;
        return data?.results?.artistmatches?.artist;
    }
    catch (error) {
        return { error: error.message };
    }
}

const fetchArtist = async (req, res) => {
    let artist = req.query?.name || getRandomArtist();
    let result = await retrieveResult(artist);
    if (result.error) return res.status(400).json(result);
    if (result.length === 0) artist = getRandomArtist();
    result = await retrieveResult(artist);
    const data = result?.map(r => {
        const { name, mbid, url, image } = r;
        const image_small = r?.image?.find(i => i.size === 'small')?.['#text'];
        return { name, mbid, url, image_small, image };
    });
    const filename = req.query?.filename || `artist_${artist}_${Date.now()}`;
    saveArtistResult(data, filename);
    return res.status(200).json(data);
}

module.exports = {
    fetchArtist
}