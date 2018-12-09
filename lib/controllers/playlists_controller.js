const Playlist = require('../models/playlist');

const index = (request, response) => {
  Playlist.all()
    .then(playlists => {
      response.status(200).json(playlists.rows);
    });
}

module.exports = {
  index
}
