import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const navigate = useNavigate();

  const { isLogged } = useAuth();

  const btns = isLogged ? (
    <button type="button" onClick={() => navigate("/phone")}>
      entra
    </button>
  ) : (
    <button type="button" onClick={() => navigate("/login")}>
      login
    </button>
  );

  return (
    <div className="home">
      <nav className="navbar flex">
        <img
          src="/imgs/ChatGenius-logo.png"
          alt="chatGenious-logo"
          id="chatGeniousLogo"
        />
        <ul className="links">
          <li><Link to="#info">Informazioni</Link></li>
        </ul>
        {btns}
      </nav>
    </div>
  );
};

export default Home;
