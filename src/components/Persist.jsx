import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";
import Loading from "./Loading.jsx";
import useRefresh from "../hooks/useRefresh.jsx";

const Persist = () => {
  const { isLogged } = useAuth();
  const navigate = useNavigate();
  const refresh = useRefresh();

  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLogged) refresh();
    // else setIsLoading(false);
  }, [isLogged]);

  return isLogged && <Outlet />
};

export default Persist;
