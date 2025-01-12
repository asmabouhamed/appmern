module.exports = app => {
  const router = require('express').Router();
  const fournisseurController = require('../controllers/Pfournisseurs.controller');
  
  const produitController = require('../controllers/Pproduits.controller'); // Importez le contrôleur des produits

  // Routes pour les fournisseurs

  // Routes pour les tiers
  router.post('/fournisseurs', fournisseurController.create);
  router.get('/fournisseurs', fournisseurController.findAll); // Obtenir tous les produits
  router.get('/fournisseurs/:id', fournisseurController.findOne); // Obtenir un produit par son ID
  router.put('/fournisseurs/:id', fournisseurController.update); // Mettre à jour un produit
  router.delete('/fournisseurs/:id', fournisseurController.delete); // Supprimer un produit

  // Routes pour les produits
  router.post('/produit', produitController.createProduct); // Créer un nouveau produit
  router.get('/produit', produitController.getAllProducts); // Obtenir tous les produits
  router.get('/produit/:id', produitController.getProductById); // Obtenir un produit par son ID
  router.put('/produit/:id', produitController.updateProduct); // Mettre à jour un produit
  router.delete('/produit/:id', produitController.deleteProduct); // Supprimer un produit

  // Utilisez le routeur pour gérer les routes
  app.use('/api/', router);
}
