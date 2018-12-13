# Play - Back End API Endpoint

[Live Link](https://sheltered-lake-54213.herokuapp.com)

## Table of Contents

* [Description/Purpose](#descriptionpurpose)
* [System Requirements](#system-requirements)
* [Setup](#setup)
* [Dependencies](#dependencies)
* [Contributors](#contributors)
* [API Endpoints](#api-endpoints)
    * [Songs](#songs)
        * [Retrieve All Songs](#get-apiv1songs)
        * [Retrieve A Song](#get-apiv1songsid)
        * [Add A Song](#post-apiv1songs)
        * [Update A Song](#patch-apiv1songsid)
        * [Delete A Song](#delete-apiv1songsid)
    * [Playlists](#playlists)
        * [Retrieve All Playlists](#get-apiv1playlists)
        * [Create A Playlist](#post-apiv1playlists)
        * [Retrieve A Playlist](#get-apiv1playlistsplaylist_idsongs)
        * [Add Song To A Playlist](#post-apiv1playlistsplaylist_idsongsid)
        * [Remove Song From A Playlist](#delete-apiv1playlistsplaylist_idsongsid)



## Description/Purpose

This project is a back-end service that drives a separate front-end application.
It includes a database service that tracks songs that users have favorited
through the front-end application. Users can also create playlists and add
their favorite songs to a playlist. Song metadata comes from the [MusixMatch API](https://developer.musixmatch.com/).

## System Requirements

This application requires several technologies to be installed to your local
machine. The following are required:

1. [NodeJS](https://nodejs.org/en/)
2. [PostgreSQL](https://www.postgresql.org/)

## Setup

To install this application locally, take the following steps:

1. Run `git clone git@github.com:DanielMulitauopele/play-api.git` in your terminal
2. Navigate to the newly created project directory
3. Run `npm install` in your terminal to install the required node modules
4. In your terminal run `psql` to launch the PostgreSQL CLI
5. Run `CREATE DATABASE play;` for the development database, and
`CREATE DATABASE play_test;` for the test database.
6. Run `knex migrate:latest` to run the necessary migrations to get the tables
up and running.
7. Run `npm test` to start the test suite.
8. Run `npm start` to start the server to view the application endpoints at
`http://localhost:3000`.

## Dependencies

**Production**
 - [Express](https://www.npmjs.com/package/express)
 - [Nodemon](https://www.npmjs.com/package/nodemon)
 - [Knex](https://www.npmjs.com/package/knex)
 - [PG](https://www.npmjs.com/package/pg)
 - [PryJS](https://www.npmjs.com/package/pryjs)

**Development**
 - [Chai](https://www.npmjs.com/package/chai)
 - [ChaiHTTP](https://www.npmjs.com/package/chai-http)
 - [Mocha](https://www.npmjs.com/package/mocha)
 - [Istanbul](https://www.npmjs.com/package/istanbul)
 - [NYC](https://www.npmjs.com/package/nyc)

## Contributors

This project was developed, tested, and published by [Mike McKee](https://github.com/mikecm1141/) and [Daniel Mulitauopele](https://github.com/DanielMulitauopele/).

## API Endpoints

There are two main endpoints for interacting with this API.

### Songs Endpoints

#### GET /api/v1/songs

Returns all songs that have been favorited and added to the database.

**Request**
```
GET /api/v1/songs
```

**Response**
```json
[
    {
        "id": 1,
        "name": "We Are The Champions",
        "artist_name": "Queen",
        "genre": "Rock",
        "song_rating": 84
    },
    {
        "id": 2,
        "name": "Sandstorm",
        "artist_name": "Darude",
        "genre": "Electronic",
        "song_rating": 82
    }
]
```

#### GET /api/v1/songs/:id

Returns a song with the specific given `:id`.

**Request**
```
GET /api/v1/songs/1
```

**Response**
```json
{
    "id": 1,
    "name": "We Are The Champions",
    "artist_name": "Queen",
    "genre": "Rock",
    "song_rating": 84
}
```

If no song is found with given ID, the following is returned with a status 404.

```json
{
    "error": "Could not find song with id: 35"
}
```

#### POST /api/v1/songs

Adds a song to the database with given parameters.

**Request**
```
POST /api/v1/songs

Content-Type: application/json
Body:
{ "name":"We Will Rock You", "artist_name": "Queen", "genre":"Rock", "song_rating":"90" }
```

**Response**
```json
{
    "songs": {
        "id": 22,
        "name": "We Will Rock You",
        "artist_name": "Queen",
        "genre": "Rock",
        "song_rating": 90
    }
}
```

_All Fields Are Required! Song rating must be between 1 and 100._

If any fields are not given (artist name in this case), a 400 status code is returned with the following response.

```json
{
    "error": "Expected format: { name: <String>, artist_name: <String>, genre: <String>, song_rating: <Integer> }. You're missing a "artist_name" property."
}
```

#### PATCH /api/v1/songs/:id

Update a specific song with the given ID. ID field is required. You can specify all fields or just one.

**Request**
```
PATCH /api/v1/songs/1

Content-Type: application/json
Body:
{ "name":"We Will Rock Youuuu" }
```

**Response**
```json
{
    "songs": {
        "id": 17,
        "name": "We Will Rock Youuuu",
        "artist_name": "Queen",
        "genre": "Rock",
        "song_rating": 90
    }
}
```

If song with the given ID is not found, returns a 404 error with the following response.

```json
{
    "error": "Song with ID 500 not found"
}
```

#### DELETE /api/v1/songs/:id

Deletes the specific song with the given ID. ID field is required.

**Request*
```
DELETE /api/v1/songs/1
```

**Response**
```
204 No Content
```

If song with the given ID is not found, returns a 404 error with the following response.

```json
{
    "error": "Song with ID 500 not found"
}
```

### Playlists Endpoints

#### GET /api/v1/playlists

Retrieves all playlists with their songs if applicable.

**Request**
```json
GET /api/v1/playlists
```

**Response**
```json
[
    {
        "id": 1,
        "playlist_name": "Super Cool Fun Jams",
        "songs": [
            {
                "id": 1,
                "name": "We Will Rock You",
                "artist_name": "Queen",
                "genre": "Rock",
                "song_rating": 82
            },
            {
                "id": 3,
                "name": "Le Freak",
                "artist_name": "Chic",
                "genre": "Disco/Pop",
                "song_rating": 82
            }
        ]
    },
    {
        "id": 2,
        "playlist_name": "Summer Mix",
        "songs": [
            {
                "id": 5,
                "name": "Summertime",
                "artist_name": "Childish Gambino",
                "genre": "Rap",
                "song_rating": 77
            }
        ]
    }
]
```

#### POST /api/v1/playlists

Adds a new playlist to the database. Field "playlist_name" is the only requirement.

**Request**
```json
POST /api/v1/playlists

Content-Type: application/json
Body:
{ "playlist_name":"Summer Mix" }
```

**Response**
```json
{
    "playlist": {
        "id": 4,
        "playlist_name": "Summer Mix"
    }
}
```

If no field "playlist_name" is given, returns a status 400 error.

```json
{
    "error": "Expected format: { playlist_name: <String> }."
}
```

#### GET /api/v1/playlists/:playlist_id/songs

Retrieves a specific playlist with given `:playlist_id` and its songs.

**Request**
```json
GET /api/v1/playlists/1/songs
```

**Response**
```json
{
    "id": 1,
    "playlist_name": "Super Cool Fun Jams",
    "songs":[
        {
            "id": 1,
            "name": "We Will Rock You",
            "artist_name": "Queen",
            "genre": "Rock",
            "song_rating": 82
        },
        {
            "id": 3,
            "name": "Le Freak",
            "artist_name": "Chic",
            "genre": "Disco/Pop",
            "song_rating": 82
        }
    ]
}
```

If given `:playlist_id` is not found, a 404 error is returned with the following response.

```json
{
    "error": "Playlist with ID 500 does not exist"
}
```

#### POST /api/v1/playlists/:playlist_id/songs/:id

Adds a given song with `:id` to playlist with given `:playlist_id`.

**Request**
```json
POST /api/v1/playlists/1/songs/1
```

**Response**
```json
{
    "message": "Successfully added Who Let The Dogs Out? to Super Cool Fun Jams"
}
```

If song ID is not found or playlist ID is not found, a 404 status code is returned with the following responses.

```json
{
    "error": "Song with ID 500 does not exist"
}
```

```json
{
    "error": "Playlist with ID 500 does not exist"
}
```

#### DELETE /api/v1/playlists/:playlist_id/songs/:id

Deletes a given song with `:id` from playlist with given `:playlist_id`.

**Request**
```json
DELETE /api/v1/playlists/1/songs/1
```

**Response**
```json
{
    "message": "Successfully removed Who Let The Dogs Out? from Super Cool Fun Jams"
}
```

If song ID is not found or playlist ID is not found, a 404 status code is returned with the following responses.

```json
{
    "error": "Song with ID 500 does not exist"
}
```

```json
{
    "error": "Playlist with ID 500 does not exist"
}
```
