const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

const all = () => database.raw(`SELECT playlists.id, playlists.playlist_name, 
                 array_agg(json_build_object('id', songs.id, 'name', songs.name, 
                 'artist_name', songs.artist_name, 'genre', songs.genre, 
                 'song_rating', songs.song_rating)) as songs
                 FROM playlists
                 LEFT JOIN playlist_songs ON playlists.id = playlist_songs.playlist_id
                 LEFT JOIN songs ON songs.id = playlist_songs.song_id
                 GROUP BY playlists.id
                 ORDER BY playlists.id`)

const find = (id) => database('playlists')
  .select(['id', 'playlist_name'])
  .where('id', id)

const songs = (id) => database('playlist_songs')
  .select(['songs.id', 'name', 'artist_name', 'genre', 'song_rating'])
  .join('songs', {'songs.id': 'playlist_songs.song_id'})

const create = (playlist) => database('playlists')
  .insert(playlist, ['id', 'playlist_name'])

module.exports = {
  all,
  find,
  songs,
  create
}
