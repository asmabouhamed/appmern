import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Affectation from './components/Affectation';  
import Home from "./components/Home";

import Fournisseur from './components/Fournisseur';
import CreateFournisseur from './components/CreateFournisseur';
import UpdateFournisseur from './components/UpdateFournisseur';
import DetailsFournisseur from './components/DetailsFournisseur';

import Produit from './components/Produit';
import CreateProduit from './components/CreateProduit';
import UpdateProduit from './components/UpdateProduit';
import DetailsProduit from './components/DetailsProduit';
import Navbar from './components/Navbar';

  

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/fournisseur" element={<Fournisseur />} />
          <Route path="/fournisseur/create" element={<CreateFournisseur />} />
          <Route path="/fournisseur/update/:id" element={<UpdateFournisseur />} />
          <Route path="/fournisseur/details/:id" element={<DetailsFournisseur />} />

          <Route path="/produit" element={<Produit />} />
          <Route path="/produit/create" element={<CreateProduit />} />
          <Route path="/produit/update/:id" element={<UpdateProduit />} />
          <Route path="/produit/details/:id" element={<DetailsProduit />} />



          <Route path="/affectation" element={<Affectation />} />

          <Route path="/home" element={<Home />}/>
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
