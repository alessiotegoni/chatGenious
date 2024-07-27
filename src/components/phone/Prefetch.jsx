import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, json, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getUserChats, setChats } from "../../redux/slices/chatsSlice";
import useAuth from "../../hooks/useAuth";
import Loading from "../Loading";

const Prefetch = () => {
  const { isLogged } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chats = useSelector(getUserChats);

  const [isLoading, setIsLoading] = useState(chats?.length ? false : true);

  useEffect(() => {
    if (!isLogged) return navigate("/");

    if (chats?.length) return;

    const fetchUserChats = async () => {
      try {
        const { data: chats } = await axiosPrivate.get("/chats");

        const date = new Date(Date.now());
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let hours = date.getHours();
        let minutes = date.getMinutes();
        if (hours < 10) hours = `0${hours}`;
        if (minutes < 10) minutes = `0${minutes}`;

        const lastAccess = `${day}/${
          month < 10 ? `0${month}` : month
        }  •  ${hours}:${minutes}`;

        localStorage.setItem("userInfo", JSON.stringify({ lastAccess }));

        dispatch(setChats({ chats }));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserChats();
  }, []);

  return isLogged && !isLoading ? <Outlet /> : <Loading />;
};

export default Prefetch;
