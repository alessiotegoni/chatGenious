import React, { useEffect, useState } from "react";
import BottomBar from "./BottomBar";
import TopBar from "./TopBar";
import Container from "./Container";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Phone = () => {

  const [showChat, setShowChat] = useState({});
  const [searchedChat, setSearchedChat] = useState("");

  const [activeSection, setActiveSection] = useState("chats");
  const [createContForm, setCreateContForm] = useState(false);

  return (
    <div className="phone">
      {
        <TopBar
          searchedChat={searchedChat}
          setSearchedChat={setSearchedChat}
          createContForm={createContForm}
          setCreateContForm={setCreateContForm}
        />
      }
      {
        <Container
          showChat={showChat}
          setShowChat={setShowChat}
          searchedChat={searchedChat}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          createContForm={createContForm}
          setCreateContForm={setCreateContForm}
        />
      }
      {
        <BottomBar
          createContForm={createContForm}
          setCreateContForm={setCreateContForm}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      }
    </div>
  );
};

export default Phone;
