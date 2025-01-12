import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Produit.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faEye, faSearch } from '@fortawesome/free-solid-svg-icons';

const Produit = () => {
    const [produits, setProduits] = useState([]);
    const [deleteMsg, setDeleteMsg] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const inputRef = useRef();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/produit');
            setProduits(response.data);
        } catch (error) {
            console.error('Something went wrong', error);
        }
    }, []);

    const deleteProduit = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/produit/${id}`);
            fetchData();
            setDeleteMsg(true);
            inputRef.current.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            console.error('Something went wrong!', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredProduits = produits.filter(produit =>
        produit.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='containerP' ref={inputRef}>
            <nav className='flex'>
                <h1>Gestion des Produits</h1>
                <div className='search-container'>
                    <input
                        type="text"
                        placeholder="Rechercher un produit..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <Link className='btn-primary' to='/produit/create'>Créer un Produit</Link>
            </nav>
            {deleteMsg && (
                <div className='success-message'>
                    Le produit a été supprimé avec succès.
                </div>
            )}
            <table className="produits-table">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prix</th>
                        <th>Référence</th>
                        <th>Description</th>
                        <th>Catégorie</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProduits.map((produit) => (
                        <tr key={produit._id}>
                            <td>{produit.nom}</td>
                            <td>{produit.prix}</td>
                            <td>{produit.description}</td>
                            <td>{produit.reference}</td>
                            <td>{produit.categorie}</td>
                            <td>
                                <img
                                    src={produit.images}
                                    alt="Produit"
                                    className="product-image"
                                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                                />
                            </td>
                            <td>
                                <button onClick={() => deleteProduit(produit.id)} className='btn-icon'>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                                <Link to={`/produit/update/${produit.id}`} className='btn-icon'>
                                    <FontAwesomeIcon icon={faEdit} />
                                </Link>
                                <Link to={`/produit/details/${produit.id}`} className='btn-icon'>
                                    <FontAwesomeIcon icon={faEye} />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Produit;

