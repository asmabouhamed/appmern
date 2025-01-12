const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProduitSchema = new Schema({
    nom: { type: String, required: true },
    reference: { type: String, required: true, unique: true }, // Ajout de validation unique
    description: { type: String },
    categorie: { type: String },
    prix:{type:Number},
    images: [{ type: String }] // Tableau d'URL pour les images
});

// Méthode pour transformer l'objet en JSON en incluant l'ID
ProduitSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const Produit = mongoose.model('Produit', ProduitSchema);

module.exports = Produit;
