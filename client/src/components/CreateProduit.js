import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Utilisez useNavigate pour la redirection
import './CreateProduit.css'; // Importation du fichier CSS pour les styles

const CreateProduit = () => {
    const navigate = useNavigate();
    const [newProduit, setNewProduit] = useState({});

    const handleChange = (e) => {
        setNewProduit({
            ...newProduit,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3000/api/produit', newProduit);
            navigate('/produit'); // Rediriger vers la page des produits après la création
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <div className='container mt-5'>
            <h1 className='mb-4'>Create Product</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Nom</label>
                    <input
                        type="text"
                        name="nom"
                        value={newProduit.nom}
                        onChange={handleChange}
                        required
                        placeholder='Enter name'
                    />
                </div>
                
                <div className='form-group'>
                    <label>Référence</label>
                    <input
                        type="text"
                        name="reference"
                        value={newProduit.reference}
                        onChange={handleChange}
                        required
                        placeholder='Enter reference'
                    />
                </div>

                <div className='form-group'>
                    <label>prix</label>
                    <input
                        type="number"
                        name="prix"
                        value={newProduit.prix}
                        onChange={handleChange}
                        required
                        placeholder='Enter prixxxxx'
                    />
                </div>



              

               

                <div className='form-group'>
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={newProduit.description}
                        onChange={handleChange}
                        placeholder='Enter description'
                    ></textarea>
                </div>

                <div className='form-group'>
                    <label>Catégorie</label>
                    <input
                        type="text"
                        name="categorie"
                        value={newProduit.categorie}
                        onChange={handleChange}
                        placeholder='Enter category'
                    />
                </div>

                <div className='form-group'>
    <label>Images URL</label>
    <input
        type="text"
        name="images"
        value={newProduit.images}
        onChange={handleChange}
        placeholder='Enter image URLs, separated by commas' // Indiquez à l'utilisateur comment entrer plusieurs URLs, séparées par des virgules
    />
    
</div>

                <button className='custom-button' type='submit'>
                    Ajouter Produit
                </button>
            </form>
        </div>
    );
};

export default CreateProduit;
