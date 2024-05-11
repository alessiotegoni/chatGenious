import "./index.css";
import useAuth from "./hooks/useAuth";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/auth/Login";
import Phone from "./components/phone/Phone";
import { useEffect } from "react";
import Prefetch from "./components/phone/Prefetch";
import Persist from "./components/home/Persist";
import LandingPage from "./components/home/LandingPage";
import NotFound from "./components/NotFound";
import Layout from "./components/home/Layout";
import Signin from "./components/auth/Signin";
import Info from "./components/userManual/Info";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="signin" element={<Signin />} />
          <Route element={<Persist />}>
            <Route index element={<LandingPage />} />
          </Route>
          <Route element={<Prefetch />}>
            <Route path="phone" element={<Phone />} />
          </Route>
          <Route path="usermanual">
            <Route index element={<Info />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
