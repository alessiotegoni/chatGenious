import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] = useState(false);

  const { isLogged } = useAuth();
  const { pathname } = useLocation();

  let path = pathname.split("/")[1];

  if (path === "") path = "home";

  useEffect(() => {
    const link = document.querySelector(`.links #${path}`);

    if (!link) return;

    link.classList.add("active");

    return () => {
      link.classList.remove("active");
    };
  }, [pathname]);

  const handleNavigate = (path = "") => {
    if (mobileMenu) setMobileMenu(false);
    navigate(`/${path}`);
  };

  let buttons = "";
  const authBtns = isLogged ? (
    <button
      type="button"
      onClick={() => handleNavigate("phone")}
      className="btn"
    >
      entra
    </button>
  ) : (
    <button
      type="button"
      className="btn"
      onClick={() => handleNavigate("login")}
    >
      login
    </button>
  );

  switch (path) {
    case "phone":
      buttons = (
        <button
          type="button"
          onClick={() => handleNavigate()}
          className="btn exit"
        >
          esci
        </button>
      );
      break;
    case "home":
      buttons = authBtns;
      break;
    case "usermanual":
      buttons = authBtns;
      break;
  }

  // <img
  //   src="/imgs/ChatGenius-logo.png"
  //   alt="chatGenious-logo"
  //   id="chatGeniousLogo"
  //   onClick={() => navigate("/")}
  // />

  return (
    <nav className="navbar flex">
      <h2 className="logo" onClick={() => navigate("/")}>
        ChatGenious
      </h2>
      <ul className={`links ${mobileMenu ? "active" : ""}`}>
        <li>
          <li id="home" onClick={() => handleNavigate()}>
            <a>Home</a>
          </li>
          <li id="usermanual" onClick={() => handleNavigate("usermanual")}>
            <a>Manuale d'uso</a>
          </li>
        </li>
        {buttons && <li className="mobile-btns">{buttons}</li>}
      </ul>
      {buttons}
      <button
        type="button"
        id="toggleMobileMenu"
        onClick={() => setMobileMenu((p) => !p)}
      >
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAL0lEQVR4nO3BQREAMBADofVvOpXQ/w1QAEDtiHZEAADwtSPaEQEAwNeOaEcEANQDM6arjUtOdLsAAAAASUVORK5CYII=" />
      </button>
    </nav>
  );
};

export default Navbar;
