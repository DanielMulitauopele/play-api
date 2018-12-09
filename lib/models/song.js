const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

const all = () => database('songs')
  .select(['id', 'name', 'artist_name', 'genre', 'song_rating'])

const find = (id) => database('songs')
  .select(['id', 'name', 'artist_name', 'genre', 'song_rating'])
  .where('id', id)

const create = (song) => database('songs')
  .insert(song)
  .returning(['id', 'name', 'artist_name', 'genre', 'song_rating'])

const update = (id, params) => database('songs')
  .update(params)
  .where('id', id)
  .returning(['id', 'name', 'artist_name', 'genre', 'song_rating'])


module.exports = {
  all,
  find,
  create,
  update
}
