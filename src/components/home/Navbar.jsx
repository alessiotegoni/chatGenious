import React, { useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();

  const { isLogged } = useAuth();
  const { pathname } = useLocation();

  let path = pathname.split("/")[1];

  if (path === "") path = "home";

  useEffect(() => {
    const link = document.querySelector(`.links #${path}`);

    console.log(link);

    if (!link) return;

    link.classList.add("active");

    return () => {
      link.classList.remove("active");
    };
  }, [pathname]);

  let buttons = "";
  const authBtns = isLogged ? (
    <button type="button" onClick={() => navigate("/phone")}>
      entra
    </button>
  ) : (
    <button type="button" onClick={() => navigate("/login")}>
      login
    </button>
  );

  switch (path) {
    case "phone":
      buttons = (
        <button type="button" onClick={() => navigate("/")}>
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

  return (
    <nav className="navbar flex">
      <img
        src="/imgs/ChatGenius-logo.png"
        alt="chatGenious-logo"
        id="chatGeniousLogo"
        onClick={() => navigate("/")}
      />
      <ul className="links">
        <li id="home">
          <Link to="/">Home</Link>
        </li>
        <li id="usermanual">
          <Link to="/usermanual">Manuale d'uso</Link>
        </li>
      </ul>
      {buttons}
    </nav>
  );
};

export default Navbar;
