const multer = require('multer');
const path = require('path');
const Media = require('../models/media');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Seules les images sont autorisées'));
    }
    cb(null, true);
  }
});

const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).send('Aucun fichier n\'a été téléchargé.');
  }

  try {
    const newMedia = await Media.create({
      filename: req.file.filename,
      path: req.file.path,
      type: 'image'
    });

    res.json({ message: 'Image uploadée avec succès', media: newMedia });
  } catch (error) {
    console.error('Erreur lors de l\'upload de l\'image:', error);
    res.status(500).send('Erreur du serveur');
  }
};

module.exports = {
  upload,
  uploadImage
};
