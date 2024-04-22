import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

const Signin = () => {

  const { isLogged } = useAuth()

  useEffect(() => {
    if (isLogged) navigate("/phone");
  }, []);

  return <div><Link to="/auth/login">Login</Link></div>;
};

export default Signin;
