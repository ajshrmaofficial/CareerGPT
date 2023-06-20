import { createContext, useState } from "react";

const LoggedInContext = createContext();

const LoggedInProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoggedInContext.Provider>
  );
};

export { LoggedInContext, LoggedInProvider };
