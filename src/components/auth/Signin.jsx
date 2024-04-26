import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const Signin = () => {
  const { isLogged } = useAuth();

  useEffect(() => {
    if (isLogged) navigate("/phone");
  }, [isLogged]);

  return (
    <div className="signin">
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Signin;
