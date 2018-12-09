
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

module.exports = {
  index,
  show
}
