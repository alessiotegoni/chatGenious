import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";
import Loading from "./Loading.jsx";
import useRefresh from "../hooks/useRefresh.jsx";

const Persist = () => {
  const [completed, setCompleted] = useState(false);

  const { isLogged } = useAuth();
  const navigate = useNavigate()
  const refresh = useRefresh();

  useEffect(() => {
    if (!isLogged) refresh({ setCompleted });
  }, [isLogged]);

  return isLogged ? <Outlet /> : !completed ? <Loading /> : <Outlet />;
};

export default Persist;
