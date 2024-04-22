import "./index.css";
import useAuth from "./hooks/useAuth";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Phone from "./components/Phone";
import { useEffect } from "react";
import Prefetch from "./components/Prefetch";
import Persist from "./components/Persist";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

function App() {
  const navigate = useNavigate();

  const { isLogged } = useAuth();

  useEffect(() => {
    if (isLogged) return navigate("/phone");
  }, []);

  return (
    <Routes>
      <Route path="/">
          <Route path="login" element={<Login />} />
          {/* <Route path="signin" index element={<Signin />} /> */}
        <Route index element={<Home />} />
        <Route element={<Persist />}>
          <Route element={<Prefetch />}>
            <Route path="phone" element={<Phone />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
