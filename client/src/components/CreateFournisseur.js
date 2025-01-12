import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateFournisseur.css';

const CreateFournisseur = () => {
    const navigate = useNavigate();
    const [newFournisseur, setNewFournisseur] = useState({
        Nom: '',
        Lieu: '',
        Tel: '',
        Produit: ''
    });
    const [produits, setProduits] = useState([]);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/produit');
                setProduits(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching showrooms:', error);
            }
        };

        fetchProduits();
    }, []);

    const handleChange = (e) => {
        setNewFournisseur({
            ...newFournisseur,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3000/api/fournisseurs', {
                Nom: newFournisseur.Nom,
                Lieu: newFournisseur.Lieu,
                Tel: newFournisseur.Tel,
                Produit: newFournisseur.Produit,
            });
            navigate('/fournisseur');
        } catch (error) {
            console.error('Error creating supplier:', error);
        }
    };

    return (
        <div className='container mt-5'>
            <h1 className='title'>Cree un Fournisseur</h1> {/* Titre placé ici */}
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Nom</label>
                    <input
                        type="text"
                        name="Nom"
                        value={newFournisseur.Nom}
                        onChange={handleChange}
                        required
                        placeholder='Enter name'
                    />
                </div>

                <div className='form-group'>
                    <label>Lieu</label>
                    <input
                        type="text"
                        name="Lieu"
                        value={newFournisseur.Lieu}
                        onChange={handleChange}
                        required
                        placeholder='Enter location'
                    />
                </div>

                <div className='form-group'>
                    <label>Tel</label>
                    <input
                        type="number"
                        name="Tel"
                        value={newFournisseur.Tel}
                        onChange={handleChange}
                        required
                        placeholder='Enter phone number'
                    />
                </div>

                <div className='form-group'>
                            <label htmlFor="Produit">Produit Name</label>
                            <select
                                id="Produit"
                                name="Produit"
                                value={newFournisseur.Produit}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a Produit</option>
                                {loading ? (
                                    <option disabled>Loading...</option>
                                ) : (
                                    produits.map(produit => (
                                        <option key={produit.id} value={produit.id}>
                                            {produit.nom}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>

                <button className='custom-button' type='submit'>
                    Create 
                </button>
            </form>
        </div>
    );
};

export default CreateFournisseur;
