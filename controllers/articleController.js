// Import du modèle d'article
const Article = require("../models/articleModel");

// Contrôleur pour gérer les opérations CRUD sur les articles
const articleController = {
  // Récupérer tous les articles
  getAllArticles: async (req, res) => {
    try {
      const articles = await Article.find();

      res.status(200).json(articles);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Récupérer un article par ID
  getArticleById: async (req, res) => {
    try {
      const article = await Article.findById(req.params.id);

      const lastModified = article.lastModified.toUTCString();

      if (req.headers["if-modified-since"] === lastModified) {
        return res.status(304).send();
      }

      res.setHeader("Last-Modified", lastModified);
      res.status(200).json(article);
    } catch (err) {
      res.status(404).json({ message: "Article non trouvé" });
    }
  },

  // Créer un nouvel article
  createArticle: async (req, res) => {
    const article = new Article({
      title: req.body.title,
      content: req.body.content,
    });
    try {
      const newArticle = await article.save();
      res.status(201).json(newArticle);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Mettre à jour un article
  updateArticle: async (req, res) => {
    try {
      const article = await Article.findById(req.params.id);
      if (req.body.title) {
        article.title = req.body.title;
      }
      if (req.body.content) {
        article.content = req.body.content;
      }
      article.lastModified = Date.now();
      const updatedArticle = await article.save();
      res.json(updatedArticle);
    } catch (err) {
      res.status(404).json({ message: "Article non trouvé" });
    }
  },

  // Supprimer un article
  deleteArticle: async (req, res) => {
    try {
      await Article.findByIdAndDelete(req.params.id);
      res.json({ message: "Article supprimé avec succès" });
    } catch (err) {
      res.status(404).json({ message: "Article non trouvé" });
    }
  },
};

module.exports = articleController;
