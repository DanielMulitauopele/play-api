const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const songsController = require('./lib/controllers/songs_controller');
const playlistsController = require('./lib/controllers/playlists_controller');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Play BE';

app.get('/', (request, response) => {
  response.send('Play Back End');
});

const songs = require('./lib/routes/api/v1/songs');
const playlists = require('./lib/routes/api/v1/playlists');

app.use('/api/v1/songs', songs);
app.use('/api/v1/playlists', playlists);

// app.post('/api/v1/playlists', (request, response) => {
//   const playlist = request.body;

//   if(!playlist['playlist_name']) {
//     return response
//       .status(400)
//       .send({ error: `Expected format: { playlist_name: <String> }.` });
//   }

//   database('playlists').insert(playlist, ['id', 'playlist_name'])
//     .then(playlist => {
//       response.status(201).json({ playlist: playlist[0] })
//     });
// });

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;
