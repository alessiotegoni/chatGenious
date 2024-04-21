import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate()

  useEffect(() => {
    navigate("/auth/login")
  }, [])

  return <div>Home</div>;
};

export default Home;
