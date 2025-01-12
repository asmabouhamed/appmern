import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './CreateProduit.css'; // Assurez-vous d'importer le fichier CSS pour les styles

const UpdateProduit = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get the id from the URL
    const [produit, setProduit] = useState({
        nom: '',
        reference: '',
        description: '',
        categorie: '',
        images:''
    });

    useEffect(() => {
        const fetchProduit = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/produit/${id}`);
                setProduit(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduit();
    }, [id]);

    const handleChange = (e) => {
        setProduit({
            ...produit,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:3000/api/produit/${id}`, produit);
            navigate('/produit'); // Redirect to supplier list page
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className='container mt-5'>
            <h1 className='mb-4'>Modifier le produit</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Nom</label>
                    <input
                        type="text"
                        name="nom"
                        value={produit.nom}
                        onChange={handleChange}
                        required
                        placeholder='Entrez le nom'
                    />
                </div>
                <div className='form-group'>
                    <label>prix</label>
                    <input
                        type="number"
                        name="prix"
                        value={produit.prix}
                        onChange={handleChange}
                        required
                        placeholder='Enter prixxxxx'
                    />
                </div>
                <div className='form-group'>
                    <label>Référence</label>
                    <input
                        type="text"
                        name="reference"
                        value={produit.reference}
                        onChange={handleChange}
                        required
                        placeholder='Entrez la référence'
                    />
                </div>

              

                <div className='form-group'>
                    <label>Description</label>
                    <input
                        type="text"
                        name="description"
                        value={produit.description}
                        onChange={handleChange}
                        required
                        placeholder='Entrez la description'
                    />
                </div>

                <div className='form-group'>
                    <label>Catégorie</label>
                    <input
                        type="text"
                        name="categorie"
                        value={produit.categorie}
                        onChange={handleChange}
                        required
                        placeholder='Entrez la catégorie'
                    />
                </div>
                <div className='form-group'>
    <label>Images URL</label>
    <input
        type="text"
        name="images"
        value={produit.images}
        onChange={handleChange}
        placeholder='Enter image URLs, separated by commas' // Indiquez à l'utilisateur comment entrer plusieurs URLs, séparées par des virgules
    />
    
</div>
                <button className='custom-button' type='submit'>
                    Mettre à jour le produit
                </button>
            </form>
        </div>
    );
};

export default UpdateProduit;
