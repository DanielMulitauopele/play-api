const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

const all = () => database('songs')
  .select(['id', 'name', 'artist_name', 'genre', 'song_rating'])

const show = (id) => database('songs')
  .select(['id', 'name', 'artist_name', 'genre', 'song_rating'])
  .where('id', id)

module.exports = {
  all,
  show
}
