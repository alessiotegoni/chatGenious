import React, { useEffect, useState } from "react";
import { axiosPrivate } from "../api/axios.js";
import { useSelector } from "react-redux";
import { getCurrentToken } from "../redux/slices/authSlice.js";
import useRefresh from "./useRefresh.jsx";
import { useNavigate } from "react-router-dom";

const useAxiosPrivate = () => {
  const token = useSelector(getCurrentToken);
  const refresh = useRefresh();
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const reqIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    const resIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (err) => {
        const prevReq = err?.config;
        if (
          err?.response?.status === 403 &&
          err?.response?.data?.message === "jwt expired" &&
          !prevReq?.sent
        ) {
          const { accessToken, error } = await refresh({
            setCompleted,
          });
          if (error) return navigate("/login");
          prevReq.headers.Authorization = `Bearer ${accessToken}`;
          prevReq.sent = true;
          return axiosPrivate(prevReq);
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(reqIntercept);
      axiosPrivate.interceptors.response.eject(resIntercept);
    };
  }, [token, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
