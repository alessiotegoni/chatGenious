import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import i18n from '../../config/i18n.js'
import { t } from "i18next";

const italianFlag = <svg className="flag" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 12"><path fill="#CE2B37" d="M16.5 10.154c0 .49-.193.96-.537 1.305-.344.347-.81.541-1.296.541H11V0h3.667c.486 0 .952.195 1.296.54s.537.817.537 1.306v8.308z"></path><path fill="#009246" d="M1.833 0C1.347 0 .881.195.537.54A1.853 1.853 0 000 1.847v8.308c0 .49.193.96.537 1.305.344.347.81.541 1.296.541H5.5V0H1.833z"></path><path fill="#EEE" d="M5.5 0H11v12H5.5V0z"></path></svg>

const languagesArr = [
  { code: "en", lang: "Inglese", flag: <svg className="flag" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 12"><path fill="#00247D" d="M0 1.873v1.82h2.58L0 1.872zM2.138 12h3.82V9.306L2.138 12zm8.404-2.694V12h3.82l-3.82-2.694zM0 8.308v1.819l2.58-1.82H0zM14.363 0h-3.821v2.694L14.362 0zM16.5 10.127v-1.82h-2.58l2.58 1.82zm0-6.435V1.873l-2.58 1.82h2.58zM5.958 0h-3.82l3.82 2.694V0z"></path><path fill="#CF1B2B" d="M11.523 8.308l4.45 3.139c.218-.226.374-.504.455-.808L13.12 8.308h-1.598zm-5.565 0h-.981l-4.45 3.138c.238.245.544.42.887.5l4.544-3.203v-.435zm4.584-4.616h.981l4.45-3.138a1.824 1.824 0 00-.887-.5l-4.544 3.203v.435zm-5.565 0L.527.554a1.847 1.847 0 00-.455.807l3.307 2.331h1.598z"></path><path fill="#EEE" d="M16.5 7.385H9.625V12h.917V9.306L14.362 12h.305a1.819 1.819 0 001.307-.553l-4.451-3.14h1.598l3.307 2.332a1.83 1.83 0 00.072-.485v-.027l-2.58-1.82h2.58v-.922zm-16.5 0v.923h2.58L0 10.127v.027c0 .503.201.959.526 1.292l4.451-3.138h.981v.435l-4.544 3.204c.135.032.274.053.42.053h.304l3.82-2.694V12h.917V7.385H0zm16.5-5.539c0-.484-.189-.948-.526-1.292l-4.451 3.138h-.981v-.435L15.086.053a1.822 1.822 0 00-.42-.053h-.303l-3.821 2.694V0h-.917v4.615H16.5v-.923h-2.58l2.58-1.819v-.027zM5.958 0v2.694L2.138 0h-.305A1.816 1.816 0 00.526.554l4.451 3.138H3.379L.072 1.362c-.046.157-.07.32-.072.484v.027l2.58 1.82H0v.922h6.875V0h-.917z"></path><path fill="#CF1B2B" d="M9.625 4.615V0h-2.75v4.615H0v2.77h6.875V12h2.75V7.385H16.5v-2.77H9.625z"></path></svg> },
  { code: "it", lang: "Italiano", flag: italianFlag },
  { code: "fr", lang: "Francese", flag: <svg className="flag" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 12"><path fill="#ED2939" d="M16.5 10.154c0 .49-.193.96-.537 1.305-.344.347-.81.541-1.296.541H11V0h3.667c.486 0 .952.195 1.296.54s.537.817.537 1.306v8.308z"></path><path fill="#002495" d="M1.833 0C1.347 0 .881.195.537.54A1.853 1.853 0 000 1.847v8.308c0 .49.193.96.537 1.305.344.347.81.541 1.296.541H5.5V0H1.833z"></path><path fill="#EEE" d="M5.5 0H11v12H5.5V0z"></path></svg> },
  { code: "es", lang: "Spagnolo", flag: <svg className="flag" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 12"><path fill="#C60A1D" d="M16.5 10.154c0 .49-.193.96-.537 1.305-.344.347-.81.541-1.296.541H1.833c-.486 0-.952-.195-1.296-.54A1.853 1.853 0 010 10.153V1.846c0-.49.193-.96.537-1.305C.881.195 1.347 0 1.833 0h12.834c.486 0 .952.195 1.296.54s.537.817.537 1.306v8.308z"></path><path fill="#FFC400" d="M0 3.23h16.5v5.54H0V3.23z"></path><path fill="#EA596E" d="M4.125 5.538v1.385c0 .367.145.72.403.98a1.37 1.37 0 001.944 0 1.39 1.39 0 00.403-.98V5.538h-2.75z"></path><path fill="#F4A2B2" d="M5.5 5.077h1.375v1.385H5.5V5.077z"></path><path fill="#DD2E44" d="M4.125 5.077H5.5v1.385H4.125V5.077z"></path><path fill="#EA596E" d="M5.5 5.077c.76 0 1.375-.31 1.375-.692 0-.383-.616-.693-1.375-.693s-1.375.31-1.375.693c0 .382.616.692 1.375.692z"></path><path fill="#FFAC33" d="M5.5 4.385c.76 0 1.375-.155 1.375-.347 0-.19-.616-.346-1.375-.346s-1.375.155-1.375.346c0 .192.616.347 1.375.347z"></path><path fill="#99AAB5" d="M3.208 5.077h.459v3.23h-.459v-3.23zm4.125 0h.459v3.23h-.459v-3.23z"></path><path fill="#66757F" d="M2.75 7.846h1.375v.462H2.75v-.462zm4.125 0H8.25v.462H6.875v-.462zm-3.667-3.23h.459v.46h-.459v-.46zm4.125 0h.459v.46h-.459v-.46z"></path></svg> },
];

const Navbar = () => {
  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [langMenu, setLangMenu] = useState(false);

  const [languages, setLanguages] = useState(languagesArr)

  const userLangCode = navigator.language.split("-")[0];
  const userLangInfo = languages.find((l) => l.code === userLangCode);

  const [language, setLanguage] = useState({
    code: userLangCode,
    lang: userLangInfo?.lang || "Italiano",
    flag: userLangInfo?.flag || italianFlag
  });

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

  const { enter } = t("buttons")

  let buttons = "";
  const authBtns = isLogged ? (
    <button
      type="button"
      onClick={() => handleNavigate("phone")}
      className="btn"
    >
      {enter}
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

  const handleToggleLangMenu = () => setLangMenu(p => !p)
  
  const handleSetLanguage = (l) => {
    setLanguage({ ...l })
    setLangMenu(false)
    i18n.changeLanguage(l.code)
  }

  const languagesEl = languages.map((l, i) => (
    <li key={i} className="flex" onClick={() => handleSetLanguage(l)}>
      {l.flag}
      <p>{l.lang}</p>
    </li>
  ));

  // <img
  //   src="/imgs/ChatGenius-logo.png"
  //   alt="chatGenious-logo"
  //   id="chatGeniousLogo"
  //   onClick={() => navigate("/")}
  // />

  const handleSetMobileMenu = () => {
    setMobileMenu((p) => !p)
    if (langMenu) setLangMenu(false)
  }

  return (
    <nav className="navbar flex">
      <h2 className="logo" onClick={() => navigate("/")}>
        ChatGenius
      </h2>
      <ul className={`links ${mobileMenu ? "active" : ""}`}>
        <li>
          <li id="home" onClick={() => handleNavigate()}>
            <a>Home</a>
          </li>
          {/* <li id="usermanual" onClick={() => handleNavigate("usermanual")}>
            <a>Manuale d'uso</a>
          </li> */}
          <li id="languages" onClick={handleToggleLangMenu}>
            <a>
              <div className="current-language flex">
                {language.flag}
                {language.lang}
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAaElEQVR4nO3QMQqAMBBE0ZzAeGHtgoXgPTzlt1FL2SQTbObDVFs82JScc861BqzAKd4SgcsAuETgCdiF6AHM0Xer8DgqxOtRAd6OduD9aAOuQytwPRrAx6Ef+Hj0CcjAdi+/B+dc+qELlSFsB74P8TMAAAAASUVORK5CYII=" />
              </div>
              <menu className={`dropdown${langMenu ? " active" : ""}`}>{languagesEl}</menu>
            </a>
          </li>
        </li>
        {buttons && <li className="mobile-btns">{buttons}</li>}
      </ul>
      {buttons}
      <button
        type="button"
        id="toggleMobileMenu"
        onClick={handleSetMobileMenu}
      >
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAL0lEQVR4nO3BQREAMBADofVvOpXQ/w1QAEDtiHZEAADwtSPaEQEAwNeOaEcEANQDM6arjUtOdLsAAAAASUVORK5CYII=" />
      </button>
    </nav>
  );
};

export default Navbar;
