// Import Mongoose
const mongoose = require('mongoose');

// Define the schema
const Schema = mongoose.Schema;

// Create a schema for the Product
const ProductSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String }
});

// Create the schema for the Fournisseur model
const FournisseurSchema = new Schema({
    Nom: { type: String, required: true },
    Lieu: { type: String, required: true },
    Tel: { type: Number, required: true },
    Produit: { type: String, required: true },
}, { timestamps: true });

// Define a toJSON method to customize the JSON representation of documents
FournisseurSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

// Create the Fournisseur model
const Fournisseur = mongoose.model('Fournisseur', FournisseurSchema);

// Export the model
module.exports = Fournisseur;
