import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import phoneImg from "../../../public/imgs/phone.png";

const Home = () => {
  const [text, setText] = useState("");

  const { isLogged } = useAuth();
  const navigate = useNavigate();

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

  const btns = isLogged ? (
    <button type="button" className="btn pulse" onClick={() => navigate("/phone")}>
      Continua la chat
    </button>
  ) : (
    <button type="button" className="btn pulse" onClick={() => navigate("/login")}>
      Inizia ora!
    </button>
  );

  return (
    <div className="landing-page">
      <div className="left">
        <h2>{text}</h2>
        <b>Scambia messaggi con grandi personaggi della storia!</b>
        <p>
          ChatGenius è un'esperienza interattiva unica che ti permette di
          conversare con personaggi storici, celebrità e figure di spicco del
          mondo contemporaneo, il tutto grazie alla potenza dell'intelligenza
          artificiale. Entra in chat con Leopardi, chiacchiera con James Joyce o
          scambia idee con Charles Baudelaire come se fossero lì con te.
        </p>
        <p>
          Abbiamo creato ChatGenius per avvicinare il passato e il presente,
          offrendoti la possibilità di interagire con le menti più brillanti
          della storia attraverso conversazioni coinvolgenti e autentiche. Fai
          domande, ricevi risposte e lasciati ispirare dalle parole di grandi
          personalità, tutto direttamente dalla tua chat.
        </p>
        <p>
          Entra in ChatGenius e preparati a scoprire il mondo con occhi nuovi!
        </p>
        {btns}
      </div>
      <div className="right">
        <img src={phoneImg} alt="phone-img" />
      </div>
    </div>
  );
};

export default Home;
