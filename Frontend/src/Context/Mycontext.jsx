import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Context.Provider value={{ user, setUser }}>
      {children}
    </Context.Provider>
  );
};

const MyContext = () => {
  return useContext(Context);
};

export { MyContext, ContextProvider };



