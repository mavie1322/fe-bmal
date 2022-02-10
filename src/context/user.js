import { createContext, useState } from "react";

export const UserContext = createContext({
  username: "",
  avatar_url: "",
  name: "",
  auth: false,
});

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState({
    username: "",
    avatar_url: "",
    name: "",
    auth: false,
  });

  //   const login = (username) => {
  //     setLoggedInUser((loggedInUser) => ({
  //       ...loggedInUser,
  //       username: username,
  //       auth: true,
  //     }));
  //   };
  //   const logout = () => {
  //     setLoggedInUser((loggedInUser) => ({
  //       username: "",
  //       avatar_url: "",
  //       name: "",
  //       auth: false,
  //     }));
  //   };
  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
};
