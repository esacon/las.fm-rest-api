const axios = require('axios');
const fs = require('fs');

// Loads enviroment variables and sample artist list.
const sampleArtist = require('../utils/sampleArtists');
const LASTFM_API = process.env.LASTFM_API;
const API_KEY = process.env.API_KEY;

/**
 * getRandomArtist - A function to return a random artist name from the `sampleArtist` array.
 *
 * @return {string} - A random artist name.
 */
const getRandomArtist = () => {
    const randomIndex = Math.floor(Math.random() * sampleArtist.length);
    return sampleArtist[randomIndex];
}

/**
 * saveArtistResult - A function to write the results of the API call to a CSV file.
 *
 * @param {Array} results - An array of objects containing artist information.
 * @param {string} filename - The name of the file to be written to disk.
 */

const saveArtistResult = (results, filename) => {
    // Create a header for the CSV file
    const header = 'name;mbid;url;image_small;image\n';
    try {
        // Check if the file exists, if not, create it and add the header.
        if (!fs.existsSync(`./src/files/${filename}.csv`)) {
            fs.appendFileSync(`./src/files/${filename}.csv`, header);
        }
        // Loop through the results and write each row to the CSV file.
        results.map(res => {
            const { name, mbid, url, image_small, image } = res;
            const row = `${name};${mbid};${url};${image_small};${JSON.stringify(image)}\n`;
            fs.appendFileSync(`./src/files/${filename}.csv`, row);
        });
        console.log(`Results written to ${filename}.csv`);
    } catch (err) {
        console.error(`Error while writing to CSV: ${err}`);
    }
};

/**
 * retrieveResult - retrieves artist data from Last.fm API.
 * 
 * @param {string} artist - the name of the artist to retrieve data for.
 * 
 * @returns {Promise} - a Promise that resolves with the artist data or an error object.
 */
const retrieveResult = async (artist) => {
    // URL to query Last.fm API.
    const URL = `${LASTFM_API}?method=artist.search&artist=${artist}&api_key=${API_KEY}&format=json`;
    try {
        // Make a GET request to Last.fm API.
        const response = await axios.get(URL);
        // Extract the data from the response object.
        const { data } = response;
        // Return the artist data.
        return data?.results?.artistmatches?.artist;
    }
    catch (error) {
        // Return an error object if there was an error in the request.
        return { error: error.message };
    }
}

/**
 * Function that retrieves artist data from the Last.fm API.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 *
 * @returns {Object} - JSON object containing the artist data and CSV file name.
 */
const fetchArtist = async (req, res) => {
  // Get the artist name from the request query or a random artist from the sampleArtist array.
  let artist = req.query?.name || getRandomArtist();
  // Retrieve the artist data from the Last.fm API.
  let result = await retrieveResult(artist);
  // If the API call returns an error, return a 400 Bad Request response.
  if (result.error) return res.status(400).json(result);
  // If the API call returns no results, get a different random artist.
  if (result.length === 0) artist = getRandomArtist();
  result = await retrieveResult(artist);
  // Filter the artist data to include only the desired information.
  const data = result?.map(r => {
    const { name, mbid, url, image } = r;
    const image_small = r?.image?.find(i => i.size === 'small')?.['#text'];
    return { name, mbid, url, image_small, image };
  });
  // Determine the filename for the CSV file, either from the request query or a generated name.
  const filename = req.query?.filename || `artist_${artist}_${Date.now()}`;
  // Save the filtered artist data to a CSV file.
  saveArtistResult(data, filename);
  // Return the artist data in a JSON response.
  return res.status(200).json(data);
}

module.exports = {
    fetchArtist
}