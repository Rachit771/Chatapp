import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    return userInfo?.token ? userInfo : null;
  });

  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [notification, setNotification] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        chats,
        notification,
        setNotification,
        onlineUsers,
        setOnlineUsers,
        setChats,
        selectedChat,
        setSelectedChat,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const MyContext = () => useContext(Context);

export { MyContext, ContextProvider };



