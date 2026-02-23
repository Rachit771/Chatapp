import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const isAuthenticated = Boolean(userInfo?.token);
    setUser(isAuthenticated ? userInfo : null);

    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        chats,
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



