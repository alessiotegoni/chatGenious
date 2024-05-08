import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import phoneImg from "../../../public/imgs/phone.png";
import { useTranslation } from "react-i18next";

const Home = () => {
  const [text, setText] = useState("");

  const { isLogged } = useAuth();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const words = "ChatGenius";

  useEffect(() => {
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      if (currentIndex <= words.length) {
        setText(words.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 200);

    return () => clearInterval(intervalId);
  }, [words]);

  const { startNow, continueToChat } = t("buttons")

  const btns = isLogged ? (
    <button
      type="button"
      className="btn pulse"
      onClick={() => navigate("/phone")}
    >
      {continueToChat}
    </button>
  ) : (
    <button
      type="button"
      className="btn pulse"
      onClick={() => navigate("/login")}
    >
      {startNow}
    </button>
  );

  const { line1, line2, line3 } = t("description");

  return (
    <div className="landing-page">
      <div className="left">
        <h2>{text}</h2>
        <b>{t("subtitle")}</b>
        <p>{line1}</p>
        <p>{line2}</p>
        <p>{line3}</p>
        {btns}
      </div>
      <div className="right">
        <img src={phoneImg} alt="phone-img" />
      </div>
    </div>
  );
};

export default Home;
