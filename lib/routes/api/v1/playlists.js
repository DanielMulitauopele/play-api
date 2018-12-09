const express = require('express');
const router  = express.Router();
const songsController = require('../../../controllers/songs_controller')
const playlistsController = require('../../../controllers/playlists_controller')

router.get('/', playlistsController.index);

module.exports = router;