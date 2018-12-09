const express = require('express');
const router  = express.Router();
const songsController = require('../../../controllers/songs_controller')
const playlistsController = require('../../../controllers/playlists_controller')

router.get('/', songsController.index);
router.get('/:id', songsController.show);
router.post('/', songsController.create);
router.patch('/:id', songsController.update);

// router.get('/', papersController.index);
// router.post('/', papersController.create);
// router.post('/:id/footnotes', footnotesController.create);

module.exports = router;
