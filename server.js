const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const songsController = require('./lib/controllers/songs_controller');
const playlistsController = require('./lib/controllers/playlists_controller');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Play BE';

app.get('/', (request, response) => {
  response.send('Play Back End');
});

const songs = require('./lib/routes/api/v1/songs');
const playlists = require('./lib/routes/api/v1/playlists');

app.use('/api/v1/songs', songs);
app.use('/api/v1/playlists', playlists);

app.post('/api/v1/playlists', (request, response) => {
  const playlist = request.body;

  if(!playlist['playlist_name']) {
    return response
      .status(400)
      .send({ error: `Expected format: { playlist_name: <String> }.` });
  }

  database('playlists').insert(playlist, ['id', 'playlist_name'])
    .then(playlist => {
      response.status(201).json({ playlist: playlist[0] })
    });
});

app.delete('/api/v1/playlists/:playlist_id/songs/:id', (request, response) => {
  let playlistId = request.params.playlist_id;
  let songId = request.params.id;
  let songName;
  let playlistName;
  let songCount;

  database('songs').pluck('name').where('id', songId)
    .then(song => {
      songName = song[0];
    })
    .then(() => {
      database('playlists').pluck('playlist_name').where('id', playlistId)
        .then(playlist => {
          playlistName = playlist[0];
        });
    })
    .then(() => {
      database('playlist_songs').select().where({ playlist_id: playlistId, song_id: songId })
        .then(songs => {
          if(songs.length) {
            database('playlist_songs').where({ playlist_id: playlistId, song_id: songId })
              .del()
              .then(() => {
                response.status(200).json({
                  message: `Successfully removed ${songName} from ${playlistName}`
                });
              });
          } else {
            response.status(404).json({ error: 'Playlist or song not found' });
          }
        });
    });
});

app.post('/api/v1/playlists/:playlist_id/songs/:id', (request, response) => {
  let playlistId = request.params.playlist_id;
  let songId = request.params.id;
  let songName;
  let playlistName;

  database('playlists').where('id', playlistId).select()
    .then(playlists => {
      if(playlists.length) {
        playlistName = playlists[0]['playlist_name'];
      } else {
        response.status(404).send({ error: `Playlist with ID ${playlistId} does not exist` });
      }
    })
    .then(() => {
      database('songs').where('id', songId).select()
        .then(songs => {
          if(songs.length) {
            songName = songs[0]['name'];
          } else {
            response.status(404).send({ error: `Song with ID ${songId} does not exist` });
          }
        })
    .then(() => {
      if(songName && playlistName) {
        database('playlist_songs').insert({ song_id: songId, playlist_id: playlistId })
          .then(data => {
            response.status(201).json({
              message: `Successfully added ${songName} to ${playlistName}`
            });
          });
      }
      });
    });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;
