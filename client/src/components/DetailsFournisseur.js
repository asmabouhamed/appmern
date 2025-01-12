import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './DetailsFournisseur.css'; // Importation du fichier CSS pour les styles spécifiques de la page

const DetailsFournisseur = () => {
    const { id } = useParams();
    const [fournisseur, setFournisseur] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/fournisseurs/${id}`);
                setFournisseur(response.data);
            } catch (error) {
                console.error('Error fetching supplier:', error);
            }
        };
        fetchData();
    }, [id]);

    if (!fournisseur) {
        return <div className="loading">Chargement...</div>;
    }

    return (
        <div className="details-container">
            <h2 className="details-title">Détails du fournisseur</h2>
            <div className="details-content">
                <p><span className="details-label">ID:</span> {fournisseur.id}</p>
                <p><span className="details-label">Nom:</span> {fournisseur.Nom}</p>
                <p><span className="details-label">Lieu:</span> {fournisseur.Lieu}</p>
                <p><span className="details-label">Tel:</span> {fournisseur.Tel}</p>
                <p><span className="details-label">Produit:</span> {fournisseur.Produit}</p>
            </div>
        </div>
    );
};

export default DetailsFournisseur;
