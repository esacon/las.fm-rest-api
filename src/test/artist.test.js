const supertest = require('supertest');
const axios = require('axios');

const { app, server } = require('../server');

const api = supertest(app);

const getURL = (selector, params) => {

    let name, filename;

    if (params) {
        name = params?.name;
        filename = params?.filename;
    }

    switch (selector) {
        case 'artist':
            return `/artist?name=${name}`;
        case 'file':
            return `/artist?filename=${filename}`;
        case 'both':
            return `/artist?name=${name}&filename=${filename}`;
        default:
            return `/artist`;
    }
}

describe('Artist', () => {
    describe('GET /artist', () => {
        it('should return a 200 status code', async () => {
            const URL = getURL();
            const response = await api.get(URL);
            expect(response.status).toBe(200);
        });

        it('should return a 200 status code when using the name selector', async () => {
            const URL = getURL('artist', { name: 'The Beatles' });
            const response = await api.get(URL);
            expect(response.status).toBe(200);
        });

        it('should return a 200 status code when using the filename selector', async () => {
            const URL = getURL('file', { filename: 'test_file' });
            const response = await api.get(URL);
            expect(response.status).toBe(200);
        });

        it('should return a 200 status code when using the both selectors', async () => {
            const URL = getURL('both', { artist: 'The Beatles', filename: 'test_file' });
            const response = await api.get(URL);
            expect(response.status).toBe(200);
        });

        it('should return an array of objects with name selector', async () => {
            const URL = getURL('artist', { name: 'The Beatles' });
            const response = await api.get(URL);
            expect(response.body).toBeInstanceOf(Array);
        });

        it('should return an array of objects with the correct properties', async () => {
            const URL = getURL('artist', { name: 'The Beatles' });
            const response = await api.get(URL);
            const { name, mbid, url, image_small, image } = response.body[0];
            expect(name).toBeDefined();
            expect(mbid).toBeDefined();
            expect(url).toBeDefined();
            expect(image_small).toBeDefined();
            expect(image).toBeDefined();
        });

        it('should return an array of objects with the correct property types', async () => {
            const URL = getURL('artist', { name: 'The Beatles' });
            const response = await api.get(URL);
            const { name, mbid, url, image_small, image } = response.body[0];
            expect(typeof name).toBe('string');
            expect(typeof mbid).toBe('string');
            expect(typeof url).toBe('string');
            expect(typeof image_small).toBe('string');
            expect(typeof image).toBe('object');
        });

        it('should return an array of objects with the correct property values', async () => {
            const URL = getURL('artist', { name: 'The Beatles' });
            const response = await api.get(URL);
            const { name, mbid, url, image_small, image } = response.body[0];
            expect(name).toBe('The Beatles');
            expect(mbid).toBe('b10bbbfc-cf9e-42e0-be17-e2c3e1d2600d');
            expect(url).toBe('https://www.last.fm/music/The+Beatles');
            expect(image_small).toBe('https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png');
            expect(image).toBeInstanceOf(Object);
        });


        it('should return an array of objects with file selector', async () => {
            const URL = getURL('file', { filename: 'file_undefined' });
            const response = await api.get(URL);
            expect(response.body).toBeInstanceOf(Array);
        });

        it('should return an array of objects with the correct properties when using file selector', async () => {
            const URL = getURL('file', { filename: 'file_undefined' });
            const response = await api.get(URL);
            const { name, mbid, url, image_small, image } = response.body[0];
            expect(name).toBeDefined();
            expect(mbid).toBeDefined();
            expect(url).toBeDefined();
            expect(image_small).toBeDefined();
            expect(image).toBeDefined();
        });

        it('should return an array of objects with the correct property types when using file selector', async () => {
            const URL = getURL('file', { filename: 'file_undefined' });
            const response = await api.get(URL);
            const { name, mbid, url, image_small, image } = response.body[0];
            expect(typeof name).toBe('string');
            expect(typeof mbid).toBe('string');
            expect(typeof url).toBe('string');
            expect(typeof image_small).toBe('string');
            expect(typeof image).toBe('object');
        });

        it('should return an array of objects when using the both selectors', async () => {
            const URL = getURL('both', { name: 'Coldplay', filename: 'Coldplay_test_file' });
            const response = await api.get(URL);
            expect(response.body).toBeInstanceOf(Array);
        });

        it('should return an array of objects with the correct properties when using the both selectors', async () => {
            const URL = getURL('both', { name: 'Coldplay', filename: 'Coldplay_test_file' });
            const response = await api.get(URL);
            const { name, mbid, url, image_small, image } = response.body[0];
            expect(name).toBeDefined();
            expect(mbid).toBeDefined();
            expect(url).toBeDefined();
            expect(image_small).toBeDefined();
            expect(image).toBeDefined();
        });

        it('should return an array of objects with the correct property types when using the both selectors', async () => {
            const URL = getURL('both', { name: 'Coldplay', filename: 'Coldplay_test_file' });
            const response = await api.get(URL);
            const { name, mbid, url, image_small, image } = response.body[0];
            expect(typeof name).toBe('string');
            expect(typeof mbid).toBe('string');
            expect(typeof url).toBe('string');
            expect(typeof image_small).toBe('string');
            expect(typeof image).toBe('object');
        });

        it('should return an array of objects with the correct property values when using the both selectors', async () => {
            const URL = getURL('both', { name: 'Coldplay', filename: 'Coldplay_test_file' });
            const response = await api.get(URL);
            const { name, mbid, url, image_small, image } = response.body[0];
            expect(name).toBe('Coldplay');
            expect(mbid).toBe('cc197bad-dc9c-440d-a5b5-d52ba2e14234');
            expect(url).toBe('https://www.last.fm/music/Coldplay');
            expect(image_small).toBe('https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png');
            expect(image).toBeInstanceOf(Object);
        });

        it('should generate a random file when artist name is not found', async () => {
            const URL = getURL('artist', { name: 'This is not an artist kasjldaskdlksdlaksdl' });
            const response = await api.get(URL);
            expect(response.body).toBeInstanceOf(Array);
        });

        it('should generate a random file when artist name is not found and using the both selectors', async () => {
            const URL = getURL('file', { name: 'This is not an artist kasjldaskdlksdlaksdl', filename: 'random_test_file' });
            const response = await api.get(URL);
            expect(response.body).toBeInstanceOf(Array);
        });
    });
});


afterAll(() => {
    server.close();
});