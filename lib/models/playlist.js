const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

const all = () => database.raw(`SELECT playlists.id, playlists.playlist_name, 
                 array_agg(json_build_object('id', songs.id, 'name', songs.name, 
                 'artist_name', songs.artist_name, 'genre', songs.genre, 
                 'song_rating', songs.song_rating)) as songs
                 FROM playlists
                 INNER JOIN playlist_songs ON playlists.id = playlist_songs.playlist_id
                 INNER JOIN songs ON songs.id = playlist_songs.song_id
                 GROUP BY playlists.id
                 ORDER BY playlists.id`)

module.exports = {
  all
}
