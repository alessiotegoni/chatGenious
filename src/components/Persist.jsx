import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";
import Loading from "./Loading.jsx";
import useRefresh from "../hooks/useRefresh.jsx";
import Home from "./Home.jsx";

const Persist = () => {
  const { isLogged } = useAuth();
  const navigate = useNavigate();
  const refresh = useRefresh();

  useEffect(() => { 
    try {
      if (!isLogged) refresh();
    } catch (err) {
      console.error(err);
      navigate("/login")
    }

  }, [isLogged]);

  return isLogged ? <Outlet /> : <Home />;
};

export default Persist;
