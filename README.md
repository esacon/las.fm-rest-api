# Welcome to the Artist API
This API allows you to search for artists and retrieve information about them. It also saves the result as a CSV file.
### Task

Write a Node.js REST API application that handles the following:

* Search for an artist by name based on the following endpoint artist.search, return all the results for this artist.
* Writes the result to a user-supplied CSV filename.
* The CSV file should include the following information (name, mbid, url, image_small, image)

⇒ If no results returned from the artist.search endpoint, retrieve random artist names from a
JSON dictionary source file for example:

[‘artistName1’, ‘artistName2’, ‘artistName3’]

Repeat as necessary until you have gathered a list of artists.

### Notes
* For the `image` field in the CSV file, I assumed it referred to the array of images that is returned for each artist.
* For the list of artists, I assumed it referred to a list per artist (search), so the final list used were the ones generated in the tests.
* Just for the review of this code I will upload the .env file in order to avoid any further issue.

## Endpoint
The endpoint for the API is:

```
http://localhost:3000/artist
```

## Query Parameters
You can pass two query parameters: name and filename.

* `name`: The name of the artist you want to search for. If this parameter is not provided, a random artist will be used.
* `filename`: The name of the file you want to save the result to. If this parameter is not provided, a default name will be used.

## Example
Here is an example URL that searches for the artist "Coldplay" and saves the result to a file named "artists":

```
http://localhost:3000/artist?name=coldplay&filename=artists
```

## Response
The API will return a JSON object with the following information:

* `name`: The name of the artist.
* `mbid`: The MusicBrainz Identifier of the artist.
* `url`: The URL of the artist's page on Last.fm.
* `image_small`: The URL of a small image of the artist.
* `image`: An array of images of different sizes.

## CSV file
The result will also be saved as a CSV file in the "files" directory in the project. The file will have the following columns:

* `name`
* `mbid`
* `url`
* `image_small`
* `image`

## Test

- GET /artist
    -  &#x2705; should return a 200 status code
    -  &#x2705; should return a 200 status code when using the name selector
    -  &#x2705; should return a 200 status code when using the filename selector
    -  &#x2705; should return a 200 status code when using the both selectors
    -  &#x2705; should return an array of objects with name selector
    -  &#x2705; should return an array of objects with the correct properties
    -  &#x2705; should return an array of objects with the correct property types
    -  &#x2705; should return an array of objects with the correct property values
    -  &#x2705; should return an array of objects with file selector
    -  &#x2705; should return an array of objects with the correct properties when using file selector
    -  &#x2705; should return an array of objects with the correct property types when using file selector
    -  &#x2705; should return an array of objects when using the both selectors
    -  &#x2705; should return an array of objects with the correct properties when using the both selectors
    -  &#x2705; should return an array of objects with the correct property types when using the both selectors
    -  &#x2705; should return an array of objects with the correct property values when using the both selectors
    -  &#x2705; should generate a random file when artist name is not found
    -  &#x2705; should generate a random file when artist name is not found and using the both selectors
    
 ## Contact
 
 Any question regarding the solution, please reach me out.
