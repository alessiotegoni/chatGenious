import React, { useEffect, useState } from "react";
import Dm from "./Dm";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { getUserChats, setChats } from "../../redux/slices/chatsSlice";
import Settings from "./Settings";
import { t } from "i18next";

const ChatContainer = ({
  showChat,
  setShowChat,
  searchedChat,
  activeSection,
  setActiveSection,
  createContForm,
  setCreateContForm,
}) => {
  const chats = useSelector(getUserChats);

  const [filteredChats, setFilteredChats] = useState([]);

  const [writingUser, setWritingUser] = useState({});

  const [showFullImg, setShowFullImg] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const sortedChats = [...chats].sort((chatA, chatB) => {
      const parseDate = (dateString) => {
        // if (dateString === "Oggi") return new Date();
        // if (dateString === "Ieri") {
        //   const yesterday = new Date();
        //   yesterday.setDate(yesterday.getDate() - 1);
        //   return yesterday;
        // }

        const [day, month, year] = dateString.split("/");
        return new Date(`${year}-${month}-${day}`);
      };

      if (!chatA.messages.length) return -1;
      if (!chatB.messages.length) return 1;

      const dateA = parseDate(chatA.messages.at(-1).createdAt);
      const dateB = parseDate(chatB.messages.at(-1).createdAt);

      return dateB - dateA;
    });

    dispatch(setChats({ chats: sortedChats }));
  }, []);

  useEffect(() => {
    if (!searchedChat) return setFilteredChats([]);

    setFilteredChats([
      ...chats.filter((c) =>
        c.chatName.toLowerCase().includes(searchedChat.toLowerCase())
      ),
    ]);
  }, [searchedChat]);

  const isFilterChats = searchedChat && filteredChats.length > 0;
  const isChatNotFound = searchedChat && filteredChats.length < 1;

  const { noContact, noResult } = t("phone");

  const chatsEl = isChatNotFound ? (
    <h2 className="no-result">{noResult}</h2>
  ) : !isFilterChats && chats.length < 1 ? (
    <p className="no-chats">
      {noContact.first},{" "}
      <span onClick={() => setCreateContForm(true)}>{noContact.second}</span>
    </p>
  ) : (
    (isFilterChats ? [...filteredChats] : [...chats]).map((c) => (
      <Chat key={c._id} chat={c} setShowChat={setShowChat} />
    ))
  );

  const openedChat = chats.find((c) => c._id === showChat.chatId);

  const chat = (
    <Dm
      chat={openedChat}
      showChat={showChat}
      setShowChat={setShowChat}
      writingUser={writingUser}
      setWritingUser={setWritingUser}
      showFullImg={showFullImg}
      setShowFullImg={setShowFullImg}
    />
  );

  let section;

  switch (activeSection) {
    case "settings":
      section = (
        <Settings
          setShowChat={setShowChat}
          setActiveSection={setActiveSection}
          createContForm={createContForm}
          setCreateContForm={setCreateContForm}
        />
      );
      break;
    case "chats":
      section = <main className="container">{chatsEl}</main>;

      break;
    default:
      section = () => location.reload();
      break;
  }

  const content = (
    <>
      {section}
      {showChat.show && chat}
    </>
  );

  return content;
};

export default ChatContainer;
