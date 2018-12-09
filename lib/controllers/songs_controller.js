
const Song = require('../models/song');

const index = (request, response) => {
  Song.all()
    .then((songs) => {
      response.status(200).json(songs);
    })
    .catch((error) => {
      response.status(500).json({error});
    });
}

const show = (request, response) => {
  const id = request.params.id;

  Song.find(id)
    .then(song => {
      if(song.length) {
        response.status(200).json(song);
      } else {
        response.status(404).json({
          error: `Could not find song with id: ${id}`
        });
      }
    });
}

const create = (request, response) => {
  const song = request.body;
  const requiredParameter = ['name', 'artist_name', 'genre', 'song_rating'];

  for (let parameter of requiredParameter) {
    if (!song[parameter]) {
      return response.status(400).json({
        error: `Expected format: { name: <String>, artist_name: <String>, 
          genre: <String>, song_rating: <Integer> }. 
          You're missing a "${parameter}" property.`
      });
    }
  }

  if ((song['song_rating']) > 100 || (song['song_rating'] < 1)) {
    return response.status(400).json({
      error: `song_rating: ${song['song_rating']} is invalid. 
      song_rating must be an integer between 1 and 100.`
    });
  }

  Song.create(song)
    .then(song => {
      response.status(201).json({ songs: song[0] });
    })
}

module.exports = {
  index,
  show,
  create
}
