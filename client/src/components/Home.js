import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../assets/chocolate.jpeg";
import "./Home.css";

function Home() {
  return (
    <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="headerContainer">
        <h1>  Chocolate House</h1>
        
        <Link to="/affectation">
          <button> VOIR LISTE</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
