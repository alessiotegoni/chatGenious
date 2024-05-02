import React, { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteChatMsgs,
  deleteChats,
  getUserChats,
  saveMessage,
} from "../../redux/slices/chatsSlice";

const Dm = ({ chat, showChat, setShowChat, showFullImg, setShowFullImg }) => {
  const msgsContainer = useRef();
  const chatImg = useRef();

  const chats = useSelector(getUserChats);

  const [userInput, setUserInput] = useState("");
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [showMsgsDate, setShowMsgsDate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [deleteQuest, setDeleteQuest] = useState({});

  const axios = useAxiosPrivate();
  const dispatch = useDispatch();

  useEffect(() => {
    msgsContainer.current.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    scrollToLastMsg();
  }, [chats]);

  const canSend = userInput.length > 0 && !isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canSend) return;

    const newMsg = {
      role: "user",
      content: userInput,
      createdAt: new Date(Date.now()).toISOString(),
    };

    let timeOutId;

    try {
      setUserInput("");

      dispatch(saveMessage({ chatId: chat._id, newMsg }));
      new Audio("/audios/Outcoming-message.mp3").play();

      const res = await axios.post("/chats/messages", {
        chatId: chat._id,
        newMsg,
      });

      if (!res.data || res.name === "AxiosError") throw new Error(res);

      timeOutId = setTimeout(() => {
        setIsLoading(true);
      }, 3000 + Math.floor(Math.random() * newMsg.content.length));

      const { speakingWith, geminiRes } = res.data;

      setTimeout(() => {
        new Audio("/audios/Incoming-message.mp3").play();
        dispatch(saveMessage({ chatId: chat._id, newMsg: geminiRes }));
        setIsLoading(false);
      }, 7000 + Math.floor(Math.random() * geminiRes.content.length));
    } catch (err) {
      console.error(err?.response?.data || err.message);
      setIsLoading(false);
      clearTimeout(timeOutId);
      dispatch(
        saveMessage({
          chatId: chat._id,
          newMsg: { ...newMsg, isErrorMsg: true },
        })
      );
      setTimeout(() => {
        dispatch(
          saveMessage({
            chatId: chat._id,
            newMsg: { ...newMsg, isErrorMsg: true, remove: true },
          })
        );
      }, 10000);
    }
  };

  const messagesEl = chat?.messages?.map((msg, i) => {
    const isPersonal = msg.role === "user";
    const date = new Date(msg.createdAt);

    let hours = date.getHours();
    let minutes = date.getMinutes();

    if (hours < 10) hours = `0${hours}`;
    if (minutes < 10) minutes = `0${minutes}`;

    const content = msg.isErrorMsg
      ? `Errore, messaggio non inviato: ${msg.content}`
      : msg.content.replace("*", "");

    return (
      <article
        key={i}
        className={`msg${isPersonal ? " personal" : ""}${
          msg.isErrorMsg ? " error" : ""
        }`}
      >
        <div className="info">
          <p className="text">{content}</p>
          <div className="flex">
            <p className="msg-date">{`${hours}:${minutes}`}</p>
          </div>
        </div>
        {msg.isErrorMsg && (
          <img
            className="error-icon"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAACxElEQVR4nM2X3U4aURDH1zdp0963tr1tCLvng4UIaWvaBxC8Uh4AvKrb9kIDt+qD+ATK7kGgTT+u1EQt2kTUVbcEIepp/tsWFBF2KcSeZBJyzrI/ZuZ/ZgZF+Z+XVJQRKxh8ahLyPh8KfRSh0J5JSB2W53x3TddLgtJ3OVV9MjBgjpDXgrFyMRI53ZicbOyn09I2DFmdn3cNn7G3mUjUC+HwqeC8bKnqOL7bF3QlGHyQZ+xrKRp1Kum0rGWzngw/ohSLORbnXyxK7/uCWqoaNCk92U4mz2uZjGdo0zIZuZ1MXgjGTnKEBDxDBWPVysyMf2AH7y3Gqj3hCI1J6bGf0PYyOIDo5QKBhx2hEIPg/Jsb3gFB/9pOMnkuGPvcUXCmpr2BkPrKqYecF2Mxx9S0Vze9ZazcLcSN5WV5trh46znO8Ey3fAvGvl8DC0Ke4Q52g2JdHhx0hGMPZ1jd4IVw+HRV00ZboiLkw0Y83rjVm4UFeVmp/IYfHsqzpSVPZ+22GY/XLUqNJhhlEKHolqdOAD/QGsKdSkmh68UWmLEfx4bRUyTXQEdHLswrtJbNSnt2VqLOXw312c+5OU8KdeF/gC7Utj1Ba9msBAOsuwFTWmupmrE936G2bf+hNgwpON9tgXW9dCfisig1NhKJ+rCv0/rERMMi5G0TjMmhEIk4wy4ga+GwYwWDj9obRHl/mCUzlZIW5zs3W6KqjhfRJDyosx8rRqNOTlVfdGyLGFfQwgYN3ZqePhecf7p1DjMDgXuCMbuXwv2Y25UoPcEM1xHaFBohAYwrg4C7eWWsaqnq867QNvjxv0wjW1NTFxh5PEOvzl8YVyAKP97Dy9LYmIOcInVKP0sqygjGFUwOuIPop3gxSh/qLgwdB3vriUQdzwjOd0xCXiqDWquaNooKh5KHvy1oLDDU3ryuFyxCZlcofTww4LDWLxRSg9qgNiKgAAAAAElFTkSuQmCC"
          />
        )}
      </article>
    );
  });

  const msgBtns = userInput.length ? (
    <button
      type="submit"
      className="pulse2"
      id="sendMessageBtn"
      disabled={!canSend}
    >
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABLklEQVR4nO2WPy8FQRTFN0FBIxKNWi3hnifRPa2gfK2S6CVKhUajJM7db/BapURofAKtRHhbkZ27qCSyspYXolkrO0PyTnK6SX5nJnP/RNFAoQRmy1DrCe0KattgMuYFLLRbqOV90xLQNsB8pFEwPkO/BriW2NY73XzIL1hLC+0StI53MPp2Fy2m7QBgK19A7WRe3ax3MMrbv0CtC9q0Z7B9BHgGjeDT1M/BtOR38Dc/Ct0umI5XBotmK99quaZF3b3QbS3s34xWDjBzaBMSG6DpmtD2QHf83s3qhOgVPaC9kw9HdQU+TCJ2i6BtQt0B1E6h7q5igPMgYFE7+3tPPXeUrhYHvX8uhConBGsg+k9apvgfEs7vWBTviwAbXn0k1LLXYrZUwL2vtwNFDekVzoh4aIzkW8sAAAAASUVORK5CYII=" />
    </button>
  ) : (
    <>
      <button type="button">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAACPElEQVR4nO1WPW8TQRC9AiQKPoVEBR1KIiSTeOfOBU1KAr8D+AtgGrr0CBQyY5NIQENkkSYJiRAFIgLxUfETEBQI52Y2QZQYjW8vgO31GbIOipQnTXOzO+/N7OzcRtE+9goS4gmDvAwkKZC0PJYC8dLEvXQ8KDkgG0D51of4DzMk36EmlXACSF66wPeTO/akb536AGXOCXkRhPz8zNYpQP5hUDYn51uHitbrGl2re3TvX5HFcxtnDEmjHaCztMirg8bRtV3HksVcjOt21E+OvOE51w+AaWlwAWmpvcfTqMrVtcmQNDKlvFyh5ukoMDSmIV5xIha6BWBW9mGQ59DMXTPbLie4EhUFqdxuHjUkNwHlfftqtq8nvzMo1Qv1r0eK9nt5YAABercB5XOfGfApRkmGIiCu21FAYdcn64bk4rm7Xw5r1uVZmQLiV9ltEU7IjgQXACjP8waavNU60OnXb9uNTPIsqADAzbHtWY/pMV/w0oycyKvkq8I/CTA1uZZlxg985L/E8iM3uK6EE4BSzfw8XSiAeNpNvmo4AcRXXVYP/0sF4LceGJ/n47veAwrtbNfhDcDWwagD+g1QnrijWuv071hAQnYkzw6QX8doL+kMUIOavWyQ3+RVKtfkbHABCp1yOu28LyGUj+VZiaM+2JEAhU4/QLlhiN8CyZaay/66+qICeHnMLv4NgUR6KVt0w2al54MhCDk/dT30uPfPhvo+uYOYIW56qxxnJVrQB0N4YrGa+TCPeB97Ez8Bow4hqQ/nxnwAAAAASUVORK5CYII=" />
      </button>
      <button type="button">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABZ0lEQVR4nO1V3UrDUAw+7Nq/ewV/UC+82Txnq+AuxAfTPYMgzKQTr2VUvFfBhxiIj6CrTVofoJKu3ars2M4NrxoIhZB8X5ImOUqVEAf9DQ3c18CRqAH2Gt1wr0xsSXD6MMhxXsVW7/rrcxNo4P5P8LEC3S6CILISIPPcBMYOnmhFoKoW/W+LDPKnBB33hsuZTSOHZfbAufBXRhvOkZVAA72KUwupMSYF9mwEsuUTP9IjO73YKwDG0Qngs8zWwnBfI/nTbtGhy7u5SjuJHenqFwI6TW/Mu5Sc2eWoyd2RdiUK3M+D129oLUuiCcGJlSDN5DmtwlOduKaKpBPXNPB9GvNU6F/v0pZBDtKAOwPBqtVXMk/Bk5b1gk1VRgyER5M3gIYa+Fx+4sHl25JMmHbZSM+ztiRflx01izSveccgPxbtgUZ+cJC2ZwL/Vo0btWW6NPAgN56DZOLcqP1n4KlkuKA3oCJQOfkC6fIBGrtezhQAAAAASUVORK5CYII=" />
      </button>
    </>
  );

  const scrollToLastMsg = () => {
    if (!showFullImg)
      msgsContainer.current.scrollTop = msgsContainer.current.scrollHeight;
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = msgsContainer.current;
    const isScrolledToBottom = Math.ceil(
      scrollTop + clientHeight >= scrollHeight
    );
    setShowScrollBtn(!isScrolledToBottom);

    if (scrollTop > 0 && !showMsgsDate) setShowMsgsDate(true);

    setTimeout(() => setShowMsgsDate(false), 4000);
  };

  const scrollToBottomBtn = (
    <button
      type="button"
      id="sToLastMsgBtn"
      onClick={scrollToLastMsg}
      className={showScrollBtn ? "active" : ""}
    >
      <img src="data:image/png;base64,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" />
    </button>
  );

  const fullImgEl = showFullImg && (
    <div className="full-img" onClick={() => setShowFullImg(false)}></div>
  );

  const handleDeleteQuest = (e) => {
    const btn = e.target;

    if (!btn.hasAttribute("type")) return;

    const dropdown = document.querySelector(".dropdown");
    const dropdownText = dropdown.querySelector("p");
    dropdownText.innerHTML = btn.innerHTML;

    const { activePopup, activeBtns } = deleteQuest;

    const canShowConfirm = [activePopup, activeBtns].every(Boolean);

    setDeleteQuest((p) => {
      return { ...p, canShowConfirm, activeBtns: false, delType: btn.value };
    });
  };

  const { activePopup, activeBtns, canShowConfirm, delType } = deleteQuest;

  const canDel =
    [canShowConfirm, delType === "messages" || delType === ""].every(Boolean) &&
    !isLoading;

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!canDel) return;

    setIsLoading(true);

    let delObj = { chatId: chat._id };

    if (delType === "") {
      delObj = { ...delObj, type: "BY_ID" };
    }
    const params = new URLSearchParams(delObj);

    try {
      const { data } = await axios.delete(
        `/chats/${delType}?${params.toString()}`
      );

      console.log(data);
      setTimeout(() => {
        setIsLoading(false);
        setDeleteQuest({});
        if (delType === "") {
          dispatch(deleteChats({ chatId: chat._id, type: "BY_ID" }));
          setShowChat({});
        }
        if (delType === "messages")
          return dispatch(deleteChatMsgs({ chatId: chat._id }));
      }, 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteQuestEl = deleteQuest.activePopup && (
    <form className="delete-quest-cont">
      <p
        className="text"
        style={{ fontSize: deleteQuest.canShowConfirm ? ".75rem" : "1rem" }}
      >
        Cosa vuoi eliminare?
      </p>
      <div className="dropdown">
        <div
          className="flex"
          onClick={() =>
            setDeleteQuest((p) => {
              return { ...p, activeBtns: !p.activeBtns };
            })
          }
        >
          <p>Scegli</p>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAaElEQVR4nO3QMQqAMBBE0ZzAeGHtgoXgPTzlt1FL2SQTbObDVFs82JScc861BqzAKd4SgcsAuETgCdiF6AHM0Xer8DgqxOtRAd6OduD9aAOuQytwPRrAx6Ef+Hj0CcjAdi+/B+dc+qELlSFsB74P8TMAAAAASUVORK5CYII=" />
        </div>
        <div
          id="deleteType"
          className={deleteQuest.activeBtns && !isLoading && "active"}
          onClick={handleDeleteQuest}
        >
          <button type="button" value={"messages"}>
            Messaggi
          </button>
          <button type="button" value={""}>
            Contatto
          </button>
        </div>
      </div>
      {deleteQuest.canShowConfirm && !isLoading && (
        <button type="submit" id="confirmDelete" onClick={handleDelete}>
          Ok
        </button>
      )}
      {deleteQuest.canShowConfirm && isLoading && (
        <img src="https://i.stack.imgur.com/kOnzy.gif" alt="loading-gif" />
      )}
    </form>
  );

  return (
    <main className={`shown-chat active`}>
      <header>
        <div className="left">
          <button id="hideChat">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA1UlEQVR4nO3aTQrCQAyG4VxpJp7DP5Qu9GKTHk5QUKHQxLVCZXDhpq5Nhu+B7hveKUw7JQJoVxbdZNEbiw4suqOIUm9dFn2y2PS5dKD4Q9iUi94p/BCiz9TrlqLgYvuZEq8sdqAoMIQXKOEFSniBEl6ghBeMbYcTjBJOcBsldD3/UmQdRZKLXcIP0dQg3MrSqur3p7mHPfWPI0XDGMYpRhmnGGWcYpRxCmW8QhmvUMarpsqkH4ehLOOK2jietjM18sPAlaKqy4nFTrXGoozLf98PAH29AT+26xMnf632AAAAAElFTkSuQmCC"
              onClick={() => setShowChat({ chatId: chat.id, show: false })}
            />
          </button>
          <div className="grid">
            <img
              className={showFullImg ? "show-full" : ""}
              ref={chatImg}
              src={chat.chatImage}
              alt="chat-img"
              onClick={() => setShowFullImg(true)}
            />
            {showFullImg && <img src={chat.chatImage} alt="chat-img" />}
            <div>
              <h3 className="chat-name">{chat.chatName}</h3>
              {isLoading && !deleteQuest.canShowConfirm ? (
                <p className="user-writing">sta scrivendo...</p>
              ) : (
                <p className="contact-status">Online</p>
              )}
            </div>
          </div>
        </div>
        {deleteQuestEl}
        {deleteQuest.activePopup ? (
          <p onClick={() => setDeleteQuest({})} className="cancel-delete">
            Annulla
          </p>
        ) : (
          <button
            type="button"
            id="deleteActions"
            onClick={() => setDeleteQuest({ activePopup: true })}
          >
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAbklEQVR4nGNgGBHgPwND3n8GhttouJRcw9ZiMew2kXgNrS1YzTAywH8yg4hhsFqg95+BQR+LgRjiZFnAgMNX+NSOWnB7NIgYRlMRQYAlxxrgyMko4qRYcJiMsugQKRbYgzSQYvh/BgY7oi0YUgAAmsCADDydt8cAAAAASUVORK5CYII=" />
          </button>
        )}
      </header>
      <div className="msgs-container" ref={msgsContainer}>
        {messagesEl}
      </div>
      <form className="bottom-bar" onSubmit={handleSubmit}>
        <button type="button">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAmUlEQVR4nO2UTQrCMBCFcyXzcoi2C+nxnPRuFvxZ2IWZnEBJLSJCUTCZSpkP3nY+mBmeMco/AwotKAzw4eLouhUU8xmeb1NOcmL/lI5RcTGgq5YCq1k1utjAc/8+OEN6R7GeFVviQwHp54azS4kdxdoS73NL08zNjqvff2E1X/0tKjZSQG8sBV76PJWDmNg9Gu6YkqWRFFOQO1ac2cfU6ub+AAAAAElFTkSuQmCC" />
        </button>
        <div className="input-group">
          <textarea
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button type="button">
            <img src="data:image/png;base64,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" />
          </button>
        </div>
        {msgBtns}
      </form>
      {scrollToBottomBtn}
      {fullImgEl}
    </main>
  );
};

export default Dm;
