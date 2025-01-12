const slugify = require('slugify');
const db = require('../../database/db.config');
const Tiers = require('../models/tiers.model');

class TierController {
    // Create a new tier
    static create(req, res) {
        const { nom, email, telephone, lieu ,Fournisseur } = req.body;
        if (!nom) {
            return res.status(400).send({
                message: 'Nom is required.'
            });
        }
        const slug = slugify(nom, '-');
        const newTiers = new Tiers({
            nom: nom,
            email: email,
            telephone: telephone,
            Lieu:lieu,
        });
        newTiers.save()
            .then(data => {
                res.status(200).send({
                    message: 'Tier created successfully.'
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({
                    message: 'An error occurred while creating the tier.'
                });
            });
    }

    // Find all tiers
    static findAll(req, res) {
        Tier.find({})
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({
                    message: 'An error occurred while retrieving tiers.'
                });
            });
    }

    // Delete tier by id
    static delete(req, res) {
        const id = req.params.id;
        if (!id) {
            res.status(400).send({ message: "ID is required." });
        }
        Tiers.findByIdAndDelete(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Tier not found." });
                }
                res.status(200).send({ message: "Tier deleted successfully." });
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({ message: "An error occurred while deleting the tier." });
            });
    }

    // Find one tier by id
    static findOne(req, res) {
        const id = req.params.id;
        if (!id) {
            res.status(400).send({ message: "ID is required." });
        }
        Tier.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Tier not found." });
                }
                res.send(data);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({ message: "An error occurred while retrieving the tier." });
            });
    }

    // Update tier by id
    static update(req, res) {
        const id = req.params.id;
        const { nom, email, telephone,lieu } = req.body;
        if (!id || !nom) {
            res.status(400).send({ message: "ID and Nom are required." });
        }
        Tiers.findByIdAndUpdate(id, { nom: nom, email: email, telephone: telephone,lieu:lieu }, { useFindAndModify: false })
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: `Cannot update Tier with id=${id}. Tier not found.` });
                }
                res.status(200).send({ message: "Tier updated successfully." });
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({ message: "An error occurred while updating the tier." });
            });
    }
}

module.exports = TierController;
