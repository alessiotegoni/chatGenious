import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {

    
  return (
    <div className="home">
      <Navbar />
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
