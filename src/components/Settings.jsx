import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { deleteChats, getUserChats } from "../redux/slices/chatsSlice";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";

const Settings = ({
  setActiveSection,
  setShowChat,
  createContForm,
  setCreateContForm,
}) => {
  const [isLoading, setIsLoading] = useState({});
  const [msg, setMsg] = useState({});

  const { username, lastAccess, createdAt } = useAuth();

  const chats = useSelector(getUserChats);
  const axios = useAxiosPrivate();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let ftmDate;

  const createdDate = new Date(createdAt);
  const currentDate = new Date(Date.now());

  let day = createdDate.getDate();
  let month = createdDate.getMonth() + 1;
  let year = createdDate.getFullYear();
  let hours = createdDate.getHours();
  let minutes = createdDate.getMinutes();

  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;

  if (
    day === currentDate.getDate() &&
    month === currentDate.getMonth() + 1 &&
    year === currentDate.getFullYear()
  ) {
    ftmDate = "Oggi";
  } else {
    ftmDate = `${day}/${
      month < 10 ? `0${month}` : month
    }  •  ${hours}:${minutes}`;
  }

  ftmDate = ftmDate === "Oggi" ? `: ${ftmDate}` : ` il: ${ftmDate}`;

  const handleShowChat = (chatId) => {
    setActiveSection("chats");
    setShowChat({ chatId, show: true });
  };

  const handleShowCreateContact = () => {
    setActiveSection("chats");
    setCreateContForm(true);
  };

  const handleLogout = async () => {
    try {
      const { data } = await axios.delete("/auth/logout");
      console.log(data);
      navigate("/");
      dispatch(logout());
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAllChats = async () => {
    if (isLoading.loading) return;

    setIsLoading({ type: "DELETE_ALL_CHATS", loading: true });

    try {
      const { data } = await axios.delete("/chats?type=ALL");

      console.log(data);
      setTimeout(() => {
        setMsg({ type: "success", message: data.message });
      }, 2000);
      dispatch(deleteChats({ type: "ALL" }));
    } catch (err) {
      setMsg({ type: "error", message: err?.message || err?.data?.message });
      console.error(err);
    } finally {
      setTimeout(() => {
        setIsLoading({});
      }, 2000);
    }

    setTimeout(() => {
      setMsg({});
    }, 10000);
  };

  const handleDeleteAccount = async () => {
    if (isLoading.loading) return;
    try {
      const { data } = await axios.delete("/users");

      console.log(data);
      setTimeout(() => {
        setMsg({ type: "success", message: data.message });
      }, 2000);
      setTimeout(() => {
        dispatch(logout());
      }, 5000);
    } catch (err) {
      setMsg({ type: "error", message: err?.message || err?.data?.message });
      console.error(err);
    } finally {
      setTimeout(() => {
        setIsLoading({});
      }, 3000);
    }

    setTimeout(() => {
      setMsg({});
    }, 10000);

    setIsLoading({ type: "DELETE_ACCOUNT", loading: true });
  };

  const chatMessages = [];

  for (const chat of chats) {
    for (const message of chat.messages) {
      chatMessages.push(message);
    }
  }

  return (
    <div className="settings-container">
      <h2 className="title">Impostazioni</h2>
      <div className="user-info">
        <div className="box username">
          <div className="flex">
            <p>{username}</p>
            <button type="button" id="logoutBtn" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <div className="dates">
            <p>Creato{ftmDate}</p>
            <p>Ultimo accesso: {lastAccess}</p>
          </div>
        </div>
        <div className="box chats">
          {!chats.length ? (
            <p className="send-to" onClick={handleShowCreateContact}>
              Crea contatto
            </p>
          ) : (
            <>
              <p>Chattando con:</p>
              <ul>
                {chats.map(({ _id, chatName }) => (
                  <li key={_id} onClick={() => handleShowChat(_id)}>
                    {chatName}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="box chats-info">
          <p>Chat: {chats.length}</p>
          <p>Messaggi: {chatMessages.length}</p>
        </div>
        {msg.message && (
          <div className={`req-feed ${msg.type}`}>{msg.message}</div>
        )}
        <button type="button" onClick={handleDeleteAllChats}>
          {isLoading.type === "DELETE_ALL_CHATS" ? (
            <img src="/imgs/IOS-loading.gif" alt="loading-gif" />
          ) : (
            "Elimina tutte le chat"
          )}
        </button>
        <button type="button" onClick={handleDeleteAccount}>
          {isLoading.type === "DELETE_ACCOUNT" ? (
            <img src="/imgs/IOS-loading.gif" alt="loading-gif" />
          ) : (
            "Elimina account"
          )}
        </button>
      </div>
    </div>
  );
};

export default Settings;
