import React, { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Signin = () => {
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

  const canSave =
    [username.length >= 8, password.length >= 8].every(Boolean) && !isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canSave) return;

    setIsLoading(true);

    try {
      const { data } = await axios.post("/auth/register", {
        username,
        password,
      });

      dispatch(setCredentials({ accessToken: data.accessToken }));

      setMsg({ message: data.message });
      setTimeout(() => {
        navigate("/phone");
      }, 4000);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setMsg({
        isError: true,
        message: err.response?.data?.message || err?.message,
      });
    } finally {
      setTimeout(() => {
        if (isLoading) setIsLoading(false);
      }, 5000);
    }
  };

  const btnBackground =
    !username.length && !password.length
      ? "#181818"
      : canSave
      ? "#075e54"
      : "#dc354686";

  return (
    <div className="login">
      <div className="left flex">
        <img src="/imgs/ChatGenius-logo.png" alt="chatGenius-logo" />
      </div>
      <div className="right flex">
        <div className="login-container">
          <form className="box" onSubmit={handleSubmit}>
            <h2>Registrazione</h2>
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
              {username.length > 0 && username.length < 8 && (
                <p>
                  L'username deve contenere almeno 8 caratteri,
                  <span> caratteri mancanti {8 - username.length}</span>
                </p>
              )}
              <div className="input-group">
                <input
                  type="text"
                  id="password"
                  autoComplete="new-password"
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
              {password.length > 0 && password.length < 8 && (
                <p>
                  La password deve contenere almeno 8 caratteri,
                  <span> caratteri mancanti {8 - password.length}</span>
                </p>
              )}
            </div>
            <p className="go-to">
              Se hai gia' un account clicca qui, <Link to="/login">Login</Link>
            </p>
            <button
              type="submit"
              id="loginBtn"
              disabled={!canSave}
              style={{
                backgroundColor: btnBackground,
              }}
            >
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

export default Signin;
