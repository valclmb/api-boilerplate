const mongoose = require("mongoose");

// Définition du schéma d'article
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
});

// Création du modèle d'article à partir du schéma
const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
