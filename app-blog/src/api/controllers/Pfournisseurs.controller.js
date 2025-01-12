const slugify = require('slugify');
const Fournisseur = require('../models/fournisseurs.model');

class FournisseurController {
    // Create a new fournisseur
    static create(req, res) {
        const { Nom, Lieu, Tel, Produit } = req.body;
        if (!Nom || !Lieu || !Tel || !Produit) {
            return res.status(400).json({
                message: 'Nom, Lieu, Tel, and Produit cannot be empty.'
            });
        }
        const slug = slugify(Nom, '-');
        const newFournisseur = new Fournisseur({
            Nom: Nom,
            Lieu: Lieu,
            Tel: Tel,
            Produit: Produit,
        });
        newFournisseur.save()
            .then(data => {
                res.status(200).json({
                    message: 'Fournisseur created successfully.',
                    fournisseur: data
                });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({
                    message: 'An error occurred while creating the fournisseur.'
                });
            });
    }

    // Find all fournisseurs
    static findAll(req, res) {
        Fournisseur.find({})
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({
                    message: 'An error occurred while retrieving fournisseurs.'
                });
            });
    }

    // Delete fournisseur by id
    static delete(req, res) {
        const id = req.params.id;
        if (!id) {
            res.status(400).json({ message: "ID is required." });
        }
        Fournisseur.findByIdAndDelete(id)
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: "Fournisseur not found." });
                }
                res.status(200).json({ message: "Fournisseur deleted successfully." });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ message: "An error occurred while deleting the fournisseur." });
            });
    }

    // Find one fournisseur by id
    static findOne(req, res) {
        const id = req.params.id;
        if (!id) {
            res.status(400).json({ message: "ID is required." });
        }
        Fournisseur.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: "Fournisseur not found." });
                }
                res.json(data);
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ message: "An error occurred while retrieving the fournisseur." });
            });
    }

    // Update fournisseur by id
    static update(req, res) {
        const id = req.params.id;
        const { Nom, Lieu, Tel, Produit } = req.body;
        if (!id || !Nom || !Lieu || !Tel || !Produit) {
            res.status(400).json({ message: "ID, Nom, Lieu, and Tel are required." });
        }
        Fournisseur.findByIdAndUpdate(id, { Nom: Nom, Lieu: Lieu, Tel: Tel, Produit: Produit }, { useFindAndModify: false })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: `Cannot update Fournisseur with id=${id}. Fournisseur not found.` });
                }
                res.status(200).json({ message: "Fournisseur updated successfully." });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ message: "An error occurred while updating the fournisseur." });
            });
    }
}

module.exports = FournisseurController;
