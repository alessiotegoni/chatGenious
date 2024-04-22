import React, { useState } from "react";
import api from "../api/axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const useRefresh = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const refresh = async () => {
    try {
      const res = await api.get(`/auth/refresh`, {
        withCredentials: true,
      });

      const { accessToken, message } = res.data;

      console.log(res.data);

      if (!accessToken) throw Error(message);

      dispatch(setCredentials({ accessToken }));
      return { accessToken };
    } catch (err) {
      return { error: err.message };
    } 
    // finally {
    //   setIsLoading(false);
    // }
  };

  return refresh;
};

export default useRefresh;
