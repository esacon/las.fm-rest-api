#Welcome to the Artist API
This API allows you to search for artists and retrieve information about them. It also saves the result as a CSV file.

##Endpoint
The endpoint for the API is:

```
http://localhost:3000/artist
```

##Query Parameters
You can pass two query parameters: name and filename.

* `name`: The name of the artist you want to search for. If this parameter is not provided, a random artist will be used.
* `filename`: The name of the file you want to save the result to. If this parameter is not provided, a default name will be used.

##Example
Here is an example URL that searches for the artist "Cher" and saves the result to a file named "artists":

```
http://localhost:3000/artist?name=cher&filename=artists
```

##Response
The API will return a JSON object with the following information:

* name: The name of the artist.
* mbid: The MusicBrainz Identifier of the artist.
* url: The URL of the artist's page on Last.fm.
* image_small: The URL of a small image of the artist.
* image: An array of images of different sizes.

##CSV file
The result will also be saved as a CSV file in the "files" directory in the project. The file will have the following columns:

* name
* mbid
* url
* image_small
* image