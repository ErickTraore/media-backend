const express = require('express');
const app = express();
const sequelize = require('./database');
const uploadImageRoutes = require('./routes/uploadImage');
const uploadVideoRoutes = require('./routes/uploadVideo');

// Ajoutez cette ligne pour importer le module CORS
const cors = require('cors');

// Middleware pour parser les fichiers multipart/form-data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ajoutez ce middleware pour permettre les requêtes CORS
app.use(cors({
  origin: 'http://localhost:3000', // Remplacez par l'origine de votre frontend
  credentials: true, // Si vous utilisez des cookies ou des identifiants
}));

// Routes pour l'upload des fichiers
app.use('/api/uploadImage', uploadImageRoutes);
app.use('/api/uploadVideo', uploadVideoRoutes);

// Synchroniser la base de données et démarrer le serveur
sequelize.sync({ force: false }).then(() => {
  app.listen(3001, () => {
    console.log('Serveur démarré sur le port 3001');
  });
}).catch(err => {
  console.error('Erreur de connexion à la base de données:', err);
});
