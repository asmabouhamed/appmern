import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateFournisseur = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true); // State for loading status
    const [produits, setProduits] = useState([]); // State for produits

    const [fournisseur, setFournisseur] = useState({
        Nom: '',
        Lieu: '',
        Tel: '',
        Produit: ''
    });

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

    useEffect(() => {
        const fetchProduitNames = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/produit');
                setProduits(response.data); // Corrected to setProduits instead of setProduitNames
                setLoading(false); // Set loading to false after produits are fetched
            } catch (error) {
                console.error('Error fetching produit names:', error);
            }
        };

        fetchProduitNames();
    }, []);

    const handleChange = (e) => {
        setFournisseur({
            ...fournisseur,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:3000/api/fournisseurs/${id}`, fournisseur);
            navigate('/fournisseur'); // Assuming you have a route for displaying all suppliers
        } catch (error) {
            console.error('Error updating supplier:', error);
        }
    };

    return (
        <div className='container mt-5'>
            <h1 className='mb-4'>Update Supplier</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Nom</label>
                    <input
                        type="text"
                        name="Nom"
                        value={fournisseur.Nom}
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
                        value={fournisseur.Lieu}
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
                        value={fournisseur.Tel}
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
                        value={fournisseur.Produit}
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
                    Update Fournisseur
                </button>
            </form>
        </div>
    );
};
export default UpdateFournisseur;
