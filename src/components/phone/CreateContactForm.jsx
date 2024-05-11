import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNewChat } from "../../redux/slices/chatsSlice";
import { t } from "i18next";

const CreateContactForm = ({ active, setActive }) => {
  const [contactName, setContactName] = useState("");
  const [contactSurname, setContactSurname] = useState("");
  const [msg, setMsg] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const axios = useAxiosPrivate();
  const dispatch = useDispatch();

  const canSave = [contactName, contactSurname].every(Boolean) && !isLoading;

  useEffect(() => {
    setMsg({});
  }, [contactName, contactSurname]);

  const handleSaveContact = async () => {
    if (!canSave) return;

    setIsLoading(true);

    const data = {
      chatName: `${contactName.trim()} ${contactSurname.trim()}`,
      createdAt: new Date(Date.now()).toISOString(),
    };

    try {
      const res = await axios.post("/chats", data);

      const { newChat, message } = res.data;

      console.log(message, newChat);
      dispatch(addNewChat({ newChat }));
      setMsg({ type: "success", message });

      setTimeout(() => {
        setActive(false);
        setIsLoading(false);
      }, 3000);
    } catch (err) {
      setIsLoading(false);
      err.message = "Nome non valido";
      setMsg({
        type: "error",
        message: err.response.data.message
          ? err?.response?.data?.message
          : err.message,
      });
      console.error(err?.response?.data || err.message);
    }
  };

  const { addContact, cancel, save } = t("phone");

  const saveContactBtn = isLoading ? (
    <img
      alt="loading-gif"
      className="loading-gif"
      src="https://i.stack.imgur.com/kOnzy.gif"
    />
  ) : (
    <b id="saveContact" onClick={handleSaveContact} aria-disabled={!canSave}>
      {save}
    </b>
  );

  return (
    <section className="create-contact">
      <div className="box">
        <header className="flex">
          <p onClick={() => setActive(false)}>{cancel}</p>
          <b>{addContact.ask}</b>
          {saveContactBtn}
        </header>
        {msg.message && (
          <div className={`req-feed ${msg.type}`}>{msg.message}</div>
        )}
        <main>
          <div className="input-group flex">
            <input
              type="text"
              placeholder={addContact.name}
              id="contactNameInput"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
            />
            {contactName && (
              <img
                id="remove-contact-name"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADPUlEQVR4nO1azWvUUBDPyY+DoqDWm94U8VRPelNEESx6lPo3WIr/hR8HRUE8CXpL39vtZmeylp3ZgIoU8Ww/T36hWDxbW6xMdlttm2zysi/JtnRgYGHfm8wv8/Fm3sRxdmibEsDrgxVoXVNI9zQQaqBphfRTIy8Kt3/TlPwna2RttRoccPqBfN/frf3mTY30UiMva+QVQ15WyA2FPCyynKLpWRDsUdi8rZC/ZFA+jj/rOo2K7EJAVJCuKKB5iwDWM9Ccqrcu5wZATK+QHuYGYBPTc9d9u9cqiFqNBhTS++JAcMgK+J2emDhiBUS1ERwXcxcNQv/jWdGhJxCu/+qwpNESQay0LUPzLgRHe8hMxbuT7uJmmVK0An5StvJ6IwM/Mk6xpSuN0Tzm86X0aRZ4pmyFdaxVaC7VoSkndunKYhKY1kiiNcJSoWxFsTsroE9dA79dAJoJrXjNs9qjQYX8zVgh2ePR4BjwOWNAdboRDwRowligR4Oy1/XplAkYWSt7ZG8VWmfM3Yswtp/IUor/r1BaMFn26M3utfTC9/dHBDldz+6z/F3Xg9OhYg0+oYC+plmrvOBkt7U6ya2xeTXCrfh+VoFp37INS+h1THej4gN7E9rdMjYtodfihL3NQJBnexYc89btW4I7QGg6IkZ4wYrwCDC5gEB5Dv2IssiirQdsdCWr7oTrnvGrcCBJ2cwaELVdXEtZqngLDXakqdzT78aYMDk0dS/pN7zqtGyJLGu0GZA7uZUoSdnJpmUqUSWKXChvpaJRA/2OLBrbKTi8jN4SZbxCgkgQnRQ8bO5WdF4ao6yNVaepumC1sfK3UKvruu6uWCChe9VptGxFdRID3+oKYs0qfXBNquN5NvWNo8wn+tSl/ihoXkwFYg0M8OM+dKkHRiBWXSycT5StPK4yTSYGeBx5XnCoX8YKtRoNOD0Peiy1wdlA8IwCPubYIBl/leNmNCnDJiePYahkjoJAPM119i7ziVxdDWjaOMVmpfah2RqRUsFiLHyUE7uULyAkHUrxFn5fArRkrjwtSRUrMjKnVtskvYHyaUiuMRVwXfrpzoVG56MaXlDIH6Q9lc5OmqLx8Tf7rCuyQ05/0F9x7j0xbHPyJQAAAABJRU5ErkJggg=="
                alt="remove-contact-name"
                onClick={() => setContactName("")}
              />
            )}
          </div>
          <div className="input-group flex">
            <input
              type="text"
              placeholder={addContact.surname}
              id="contactSurnameInput"
              value={contactSurname}
              onChange={(e) => setContactSurname(e.target.value)}
            />
            {contactSurname && (
              <img
                id="remove-contact-name"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADPUlEQVR4nO1azWvUUBDPyY+DoqDWm94U8VRPelNEESx6lPo3WIr/hR8HRUE8CXpL39vtZmeylp3ZgIoU8Ww/T36hWDxbW6xMdlttm2zysi/JtnRgYGHfm8wv8/Fm3sRxdmibEsDrgxVoXVNI9zQQaqBphfRTIy8Kt3/TlPwna2RttRoccPqBfN/frf3mTY30UiMva+QVQ15WyA2FPCyynKLpWRDsUdi8rZC/ZFA+jj/rOo2K7EJAVJCuKKB5iwDWM9Ccqrcu5wZATK+QHuYGYBPTc9d9u9cqiFqNBhTS++JAcMgK+J2emDhiBUS1ERwXcxcNQv/jWdGhJxCu/+qwpNESQay0LUPzLgRHe8hMxbuT7uJmmVK0An5StvJ6IwM/Mk6xpSuN0Tzm86X0aRZ4pmyFdaxVaC7VoSkndunKYhKY1kiiNcJSoWxFsTsroE9dA79dAJoJrXjNs9qjQYX8zVgh2ePR4BjwOWNAdboRDwRowligR4Oy1/XplAkYWSt7ZG8VWmfM3Yswtp/IUor/r1BaMFn26M3utfTC9/dHBDldz+6z/F3Xg9OhYg0+oYC+plmrvOBkt7U6ya2xeTXCrfh+VoFp37INS+h1THej4gN7E9rdMjYtodfihL3NQJBnexYc89btW4I7QGg6IkZ4wYrwCDC5gEB5Dv2IssiirQdsdCWr7oTrnvGrcCBJ2cwaELVdXEtZqngLDXakqdzT78aYMDk0dS/pN7zqtGyJLGu0GZA7uZUoSdnJpmUqUSWKXChvpaJRA/2OLBrbKTi8jN4SZbxCgkgQnRQ8bO5WdF4ao6yNVaepumC1sfK3UKvruu6uWCChe9VptGxFdRID3+oKYs0qfXBNquN5NvWNo8wn+tSl/ihoXkwFYg0M8OM+dKkHRiBWXSycT5StPK4yTSYGeBx5XnCoX8YKtRoNOD0Peiy1wdlA8IwCPubYIBl/leNmNCnDJiePYahkjoJAPM119i7ziVxdDWjaOMVmpfah2RqRUsFiLHyUE7uULyAkHUrxFn5fArRkrjwtSRUrMjKnVtskvYHyaUiuMRVwXfrpzoVG56MaXlDIH6Q9lc5OmqLx8Tf7rCuyQ05/0F9x7j0xbHPyJQAAAABJRU5ErkJggg=="
                alt="remove-contact-name"
                onClick={() => setContactSurname("")}
              />
            )}
          </div>
        </main>
      </div>
    </section>
  );
};

export default CreateContactForm;
