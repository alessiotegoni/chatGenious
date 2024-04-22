import React, { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const inputRef = useRef();

  const axios = useAxiosPrivate();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogged } = useAuth();

  useEffect(() => {
    if (isLogged) navigate("/phone");
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage();
  }, [username, password]);

  const canSave = [username, password].every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canSave) return;

    try {
      const { data } = await axios.post("/auth/login", { username, password });

      if (!data.success) throw new Error(data.message);

      console.log(data);

      dispatch(setCredentials({ accessToken: data.accessToken }));

      navigate("/phone");
    } catch (err) {
      console.error(err);

      setErrorMessage(err.message);
    }
  };

  return (
    <div className="login">
      <div className="left flex">
        <img src="/imgs/ChatGenius-logo.png" alt="chatGenius-logo" />
      </div>
      <div className="right flex">
        <div className="login-container">
          <form className="box" onSubmit={handleSubmit}>
            <h2>Login</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="my-login">
              <div className="input-group">
                <input
                  type="text"
                  id="username"
                  ref={inputRef}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label
                  htmlFor="username"
                  className={username.length && "active"}
                >
                  Username <span className="danger">*</span>
                </label>
              </div>
              <div className="input-group">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label
                  htmlFor="password"
                  className={password.length && "active"}
                >
                  Password <span className="danger">*</span>
                </label>
              </div>
            </div>
            <button type="submit" id="loginBtn" disabled={!canSave}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
