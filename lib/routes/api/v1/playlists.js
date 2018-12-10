const express = require('express');
const router  = express.Router();
const songsController = require('../../../controllers/songs_controller')
const playlistsController = require('../../../controllers/playlists_controller')

router.get('/', playlistsController.index);
router.get('/:id/songs', playlistsController.show);
router.post('/', playlistsController.create);
router.post('/:playlist_id/songs/:id', playlistsController.addSong);
router.delete('/:playlist_id/songs/:id', playlistsController.removeSong);

module.exports = router;
