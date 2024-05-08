import i18n from "i18next";
import languageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// Translator

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    lng: "it",
    resources: {
      it: {
        translation: {
          subtitle: "Scambia messaggi con grandi personaggi della storia!",
          description: {
            line1:
              "ChatGenius è un'esperienza interattiva unica che ti permette di conversare con personaggi storici, celebrità e figure di spicco del mondo contemporaneo, il tutto grazie alla potenza dell'intelligenza artificiale. Entra in chat con Leopardi, chiacchiera con James Joyce o scambia idee con Charles Baudelaire come se fossero lì con te.",
            line2:
              "Abbiamo creato ChatGenius per avvicinare il passato e il presente, offrendoti la possibilità di interagire con le menti più brillanti della storia attraverso conversazioni coinvolgenti e autentiche. Fai domande, ricevi risposte e lasciati ispirare dalle parole di grandi personalità, tutto direttamente dalla tua chat.",
            line3:
              "Entra in ChatGenius e preparati a scoprire il mondo con occhi nuovi!",
          },
          buttons: {
            enter: "entra",
            startNow: "Inizia ora!",
            continueToChat: "Continua la chat",
          },
          login: {
            first: "Se non hai un account",
            goto: "Registrati",
          },
          register: {
            title: "Registrazione",
            first: "Se hai gia' un account clicca qui",
            goto: "Login",
            msg1: "deve contenere almeno 8 caratteri",
            msg2: "caratteri mancanti",
          },
        },
      },
      en: {
        translation: {
          subtitle: "Exchange messages with great characters from history!",
          description: {
            line1:
              "ChatGenius is a unique interactive experience that allows you to converse with historical figures, celebrities and leading figures from the contemporary world, all thanks to the power of artificial intelligence. Chat with Leopardi, James Joyce or exchange ideas with Charles Baudelaire as if they were there with you.",
            line2:
              "We have created ChatGenius to bring the past and present closer together, giving you the chance to interact with history's brightest minds through engaging and authentic conversations. Ask questions, get answers and be inspired by the words of great personalities, all directly from your chat.",
            line3:
              "Enter ChatGenius and get ready to discover the world with new eyes!",
          },
          buttons: {
            enter: "enter",
            startNow: "Get started now!",
            continueToChat: "Continue the conversation",
          },
          login: {
            first: "If you don't have an account",
            goto: "Sign up",
          },
          register: {
            title: "Sign up",
            first: "If you already have an account",
            goto: "Login",
            msg1: "must contain at least 8 characters",
            msg2: "characters missing",
          },
        },
      },
      fr: {
        translation: {
          subtitle:
            "Échangez des messages avec de grands personnages de l'histoire!",
          description: {
            line1:
              "ChatGenius est une expérience interactive unique qui vous permet de converser avec des personnages historiques, des célébrités et des personnalités du monde contemporain, tout cela grâce à la puissance de l'intelligence artificielle. Discutez avec Leopardi, James Joyce ou échangez des idées avec Charles Baudelaire comme s'ils étaient à vos côtés.",
            line2:
              "Nous avons créé ChatGenius pour rapprocher le passé et le présent, vous donnant la possibilité d'interagir avec les esprits les plus brillants de l'histoire à travers des conversations engageantes et authentiques. Posez des questions, obtenez des réponses et laissez-vous inspirer par les paroles de grandes personnalités, le tout directement depuis votre chat.",
            line3:
              "Entrez dans ChatGenius et préparez-vous à découvrir le monde avec un nouveau regard!",
          },
          buttons: {
            enter: "entrer",
            startNow: "Commencez maintenant!",
            continueToChat: "Continuer la conversation",
          },
          login: {
            first: "Si vous n'avez pas de compte",
            goto: "Inscrivez-vous",
          },
          register: {
            title: "Inscription",
            first: "Si vous avez déjà un compte",
            goto: "connecté",
            msg1: "doit contenir au moins 8 caractères",
            msg2: "caractères manquants",
          },
        },
      },
      es: {
        translation: {
          subtitle:
            "¡Intercambia mensajes con grandes personajes de la historia!",
          description: {
            line1:
              "ChatGenius es una experiencia interactiva única que te permite conversar con personajes históricos, celebridades y personajes destacados del mundo contemporáneo, todo gracias al poder de la inteligencia artificial. Charle con Leopardi, charle con James Joyce o intercambie ideas con Charles Baudelaire como si estuvieran allí con usted.",
            line2:
              "Creamos ChatGenius para acercar el pasado y el presente, brindándote la oportunidad de interactuar con las mentes más brillantes de la historia a través de conversaciones interesantes y auténticas. Haz preguntas, obtén respuestas e inspírate con las palabras de grandes personalidades, todo directamente desde tu chat.",
            line3:
              "¡Ingresa a ChatGenius y prepárate para descubrir el mundo con nuevos ojos!",
          },
          buttons: {
            enter: "ingresar",
            startNow: "¡Empieza ahora!",
            continueToChat: "Continúa la conversación",
          },
          login: {
            first: "Si no tienes una cuenta",
            goto: "Registrate",
          },
          register: {
            title: "Registro",
            first: "Si ya tienes una cuenta",
            goto: "Inicia la sesión",
            msg1: "debe contener al menos 8 caracteres",
            msg2: "caracteres faltantes",
          },
        },
      },
    },
    returnObjects: true,
    fallbackLng: "en",
    debug: false,
  });

export default i18n;
