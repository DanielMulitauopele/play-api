const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

const create = (playlistId, id) => database('playlist_songs')
  .insert({ playlist_id: playlistId, song_id: id })

const destroy = (playlistId, id) => database('playlist_songs')
  .where({ playlist_id: playlistId, song_id: id })
  .del()

module.exports = {
  create,
  destroy
}
