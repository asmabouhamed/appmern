import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/chocolateLogo.png";
import "./Navbar.css";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <img src={Logo} alt="logo" />
        <div className="hiddenLinks">
          <Link to="/home"> Home </Link>
          <Link to="/fournisseur"> Gestion des fournisseurs </Link>
          <Link to="/produit"> Gestion des Produits </Link>
          <Link to="/affectation"> Liste de f et p </Link>
          <Link to="/contact"> Contact </Link>
        </div>
      </div>
      <div className="rightSide">
        <Link to="/home"> Home </Link>
        <Link to="/fournisseur"> Gestion des fournisseurs </Link>
        <Link to="/produit"> Gestion des Produits </Link>
        <Link to="/affectation"> Liste de f et p </Link>
        <Link to="/contact"> Contact </Link>
        <button onClick={toggleNavbar}>Toggle Navbar</button>
      </div>
    </div>
  );
}

export default Navbar;
