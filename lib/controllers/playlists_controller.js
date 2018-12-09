const Playlist = require('../models/playlist');
const Song = require('../models/song');

const index = (request, response) => {
  Playlist.all()
    .then(playlists => {
      response.status(200).json(playlists.rows);
    });
}

const show = (request, response) => {
  const id = request.params.id;

  let playlistResponse;
  let songResponse;

  Playlist.find(id)
    .then(playlist => {
      if (playlist.length) {
        playlistResponse = playlist[0];
        Playlist.songs(id)
          .then(songs => {
            playlistResponse["songs"] = songs;
            response.status(200).json(playlistResponse);
          });
      } else {
        response.status(404).json({
          error: `Playlist with ID ${id} does not exist` 
        });
      }
    });
}

module.exports = {
  index,
  show
}
