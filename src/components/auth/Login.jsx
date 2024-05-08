import React, { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState({});

  const inputRef = useRef();

  const axios = useAxiosPrivate();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogged } = useAuth();

  useEffect(() => {
    if (isLogged) return navigate("/");
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    setMsg({});
  }, [username, password]);

  const canSave = [username, password].every(Boolean) && !isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canSave) return;

    setIsLoading(true);

    try {
      const { data } = await axios.post("/auth/login", { username, password });

      if (!data.success) throw new Error(data.message);

      dispatch(setCredentials({ accessToken: data.accessToken }));

      setMsg({ message: data.message });
      setTimeout(() => {
        navigate("/phone");
      }, 4000);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setMsg({ isError: true, message: err.message });
    } finally {
      setTimeout(() => {
        if (isLoading) setIsLoading(false);
      }, 5000);
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
            {msg.message && msg.isError && (
              <p className="msg error">{msg.message}</p>
            )}
            {msg.message && !msg.isError && (
              <p className="msg success">{msg.message}</p>
            )}
            <div className="my-login">
              <div className="input-group">
                <input
                  type="text"
                  id="username"
                  autoComplete="username"
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
                  autoComplete="current-password"
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
            <p className="go-to">
              Se non hai un account, <Link to="/signin">Registrati</Link>
            </p>
            <button type="submit" id="loginBtn" disabled={!canSave}>
              {isLoading ? (
                <img
                  src="/imgs/IOS-loading.gif"
                  className="loading-gif"
                  alt="loading-gif"
                />
              ) : (
                "login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
