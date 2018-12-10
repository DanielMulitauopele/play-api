const Playlist = require('../models/playlist');
const Song = require('../models/song');
const PlaylistSong = require('../models/playlist_song');

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

const addSong = (request, response) => {
  let playlistId = request.params.playlist_id;
  let id = request.params.id;

  let playlistName;
  let songName;

  let verifyPlaylist = Playlist.find(playlistId)
                        .then(playlist => {
                          if (playlist.length) {
                            playlistName = playlist[0].playlist_name;
                          } else {
                            response.status(404).json({
                              error: `Playlist with ID ${playlistId} does not exist` 
                            });
                          }
                        });

  let verifySong = Song.find(id)
                    .then(song => {
                      if (song.length) {
                        songName = song[0].name;
                      } else {
                        response.status(404).json({ error: `Song with ID ${id} does not exist` });
                      }
                    });

  Promise.all([verifyPlaylist, verifySong]).then(() => {
    if (playlistName && songName) {
      PlaylistSong.create(playlistId, id)
        .then(() => {
          response.status(201).json({
            message: `Successfully added ${songName} to ${playlistName}`
          });
        })
    }
  })
  .catch(error => console.error({ error }));
}

module.exports = {
  index,
  show,
  addSong
}
