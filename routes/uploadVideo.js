// routes/uploadVideo.js
const express = require('express');
const router = express.Router();
const { upload, uploadVideo } = require('../controllers/uploadVideoController');

// Route pour uploader une vidéo
router.post('/', upload.single('video'), uploadVideo);

module.exports = router;
