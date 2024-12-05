import api from "../api/axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";

const useRefresh = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    try {
      const res = await api.get(`/auth/refresh`, {
        withCredentials: true,
      });

      const { accessToken, message } = res.data;

      if (!accessToken) throw Error(message);

      dispatch(setCredentials({ accessToken }));
      return { accessToken };
    } catch (err) {
      return { error: err.message };
    }
  };

  return refresh;
};

export default useRefresh;
