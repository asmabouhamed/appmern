// Import necessary libraries
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Affectation = () => {
    // Define state variables
    const [fournisseurs, setFournisseurs] = useState([]);
    const [produitData, setProduitData] = useState([]);
    const [deleteMsg, setDeleteMsg] = useState(false);
    const inputRef = useRef();
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch fournisseurs data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/fournisseurs');
                if (response) {
                    setFournisseurs(response.data);
                }
            } catch (error) {
                console.error('Something went wrong', error);
            }
        };
        fetchData();
    }, []);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Fetch produit data including names, prices, and image URLs
    useEffect(() => {
        const fetchProduitData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/produit');
                setProduitData(response.data);
            } catch (error) {
                console.error('Error fetching produit data:', error);
            }
        };

        fetchProduitData();
    }, []);

    // Delete fournisseur
    const deleteFournisseur = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/fournisseurs/${id}`);
            const response = await axios.get('http://localhost:3000/api/fournisseurs');
            setDeleteMsg(true);
            inputRef.current.scrollIntoView({ behavior: 'smooth' });
            setFournisseurs(response.data);
        } catch (error) {
            console.error('Something went wrong!', error);
        }
    };

    return (
        <div className='container' ref={inputRef}>
            <div className='flex'>
                <h1>Liste des produits et fournisseurs</h1>
                <div className='search-container'>
                    <input
                        type="text"
                        placeholder="Rechercher un produit..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            {deleteMsg && (
                <div style={{ backgroundColor: '#34cd60', color: '#fff', padding: '10px', borderRadius: '10px'}}>
                    Le fournisseur a été supprimé avec succès.
                </div>
            )}
            <table className="table">
                <thead>
                    <tr>
                        <th>Nom Fournisseur</th>
                        <th>Nom Produit</th>
                        <th>Prix Produit</th>
                        <th>Image Produit</th>
                    </tr>
                </thead>
                <tbody>
                    {fournisseurs
                        .filter(fournisseur => {
                            const produit = produitData.find(prod => prod.id === fournisseur.Produit);
                            return produit && produit.nom.toLowerCase().includes(searchTerm.toLowerCase());
                        })
                        .map((fournisseur) => {
                            const produit = produitData.find(prod => prod.id === fournisseur.Produit);
                            return (
                                <tr key={fournisseur.id}>
                                    <td>{fournisseur.Nom}</td>
                                    <td>{produit && produit.nom}</td>
                                    <td>{produit && produit.prix}</td>
                                    <td>
                                        {produit && <img src={produit.images} alt={produit.nom} style={{ maxWidth: '100px', maxHeight: '100px' }} />}
                                    </td>

                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Affectation;
