import React from "react";
import { useSelector } from "react-redux";
import { getCurrentToken } from "../redux/slices/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = useSelector(getCurrentToken);

  let auth = { isLogged: false };

  if (token) {
    const { userId, username, createdAt } = jwtDecode(token);
    const userInfo = JSON.parse(localStorage.getItem("userInfo")) || "";

    // if (userInfo.isFirstLogin) {
    //   localStorage.setItem(
    //     "userInfo",
    //     JSON.stringify({ ...userInfo, isFirstLogin: false })
    //   );
    // }

    auth = {
      isLogged: true,
      userId,
      username,
      createdAt,
      lastAccess: userInfo?.lastAccess,
    };
  }

  return auth;
};

export default useAuth;
