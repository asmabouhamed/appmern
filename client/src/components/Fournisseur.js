import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Fournisseur.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

const Fournisseur = () => {
    const [fournisseurs, setFournisseurs] = useState([]);
    const [produitNames, setProduitNames] = useState({});
    const [deleteMsg, setDeleteMsg] = useState(false);
    const inputRef = useRef();
    const [searchTerm, setSearchTerm] = useState('');

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

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        const fetchProduitNames = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/produit');
                const names = {};
                response.data.forEach(produit => {
                    names[produit.id] = produit.nom;
                });
                setProduitNames(names);
            } catch (error) {
                console.error('Error fetching produit names:', error);
            }
        };

        fetchProduitNames();
    }, []);

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
        <div className='containerF' ref={inputRef}>
            <div className='flex'>
                <h1>Gestion des Fournisseurs</h1>
                <div className='search-container'>
                    <input
                        type="text"
                        placeholder="Rechercher un fournisseur..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <Link className='btn-primary' to='/fournisseur/create'>Créer un fournisseur</Link>
            </div>
            {deleteMsg && (
                <div style={{ backgroundColor: '#34cd60', color: '#fff', padding: '10px', borderRadius: '5px'}}>
                    Le fournisseur a été supprimé avec succès.
                </div>
            )}
            <table className="table">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Lieu</th>
                        <th>Tel</th>
                        <th>Produit</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {fournisseurs
                        .filter(fournisseur => fournisseur.Nom.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((fournisseur) => (
                            <tr key={fournisseur.id}>
                                <td>{fournisseur.Nom}</td>
                                <td>{fournisseur.Lieu}</td>
                                <td>{fournisseur.Tel}</td>
                                <td>{produitNames[fournisseur.Produit]}</td>
                                <td>
                                    <button onClick={() => deleteFournisseur(fournisseur.id)} className='btn-icon'>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                    <Link to={`/fournisseur/update/${fournisseur.id}`} className='btn-icon'>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Fournisseur;
