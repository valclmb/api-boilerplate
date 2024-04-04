// Import des modules nécessaires
const express = require("express");
const mongoose = require("mongoose");
const articleController = require("./controllers/articleController");
const articleRoutes = require("./routes/articleRoutes");
const authRoutes = require("./routes/authRoutes");
const authenticateJWT = require("./middlewares/authMiddleware");

// Initialisation de l'application Express
const app = express();

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// URL de connexion à votre base de données MongoDB
const mongoURI = "mongodb://localhost:27017/api";

// Connexion à la base de données
mongoose.connect(mongoURI);

// Vérification de la connexion
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Erreur de connexion à MongoDB :"));
db.once("open", () => {
  console.log("Connecté à la base de données MongoDB");
});

// Routes
app.use("/articles", authenticateJWT, articleRoutes);
app.use("/login", authRoutes);

// Configuration du port
const port = 3000;

// Lancement du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
