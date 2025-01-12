import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './DetailsProduit.css'; // Assurez-vous d'importer le fichier CSS pour les styles spécifiques de la page

const DetailsProduit = () => {
    const { id } = useParams();
    const [produit, setProduit] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/produit/${id}`);
                setProduit(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchData();
    }, [id]);

    return (
        <div className="details-container">
            <h2 className="details-title">Détails du produit</h2>
            <div className="details-content">
                <p><span className="details-label">ID:</span> {produit && produit.id}</p>
                <p><span className="details-label">Nom de produit:</span> {produit && produit.nom}</p>
                <p><span className="details-label">Prix:</span> {produit && produit.prix}</p>
                <p><span className="details-label">Référence:</span> {produit && produit.reference}</p>
                <p><span className="details-label">Description:</span> {produit && produit.description}</p>
                <p><span className="details-label">Catégorie:</span> {produit && produit.categorie}</p>
                <div className="image-container">
                    <span className="details-label">Image:</span>
                    <div className="image-wrapper">
                        {produit && (
                            <img
                                src={produit.images}
                                alt="Produit"
                                className="product-image"
                                style={{ maxWidth: '100px', maxHeight: '100px' }} // Définissez la taille maximale de l'image
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsProduit;
