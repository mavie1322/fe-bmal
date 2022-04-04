import React, { useEffect, useState } from "react";
import { getUserByUsername } from "../utils/api";
import IsUsernameExist from "./IsUsernameExist";
import "../App.css";

export function LogIn({ setLoggedInUser }) {
  const [signedName, setSignedName] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    getUserByUsername(signedName)
      .then((user) => {
        if (user.username === signedName) {
          setLoggedInUser({
            username: user.username,
            avatar_url: user.avatar_url,
            name: user.name,
            auth: true,
          });
          localStorage.setItem("user", user.username);
        }
      })
      .catch(() => {
        setErrorMessage(true);
      });
  };

  const handleChange = (event) => {
    const usernameEntered = event.target.value;
    setSignedName(usernameEntered);
  };
  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      const foundUser = JSON.parse(loggedUser);
      setSignedName(foundUser);
    }
  }, []);
  return (
    <>
      <div className='login_title'>BMAL</div>
      <form onSubmit={handleSubmit} className='login'>
        <span>Sign In</span>
        <div className='login_form'>
          <label className='login_label'>Username :</label>
          <input
            className='login_input'
            type='text'
            name='username'
            value={signedName}
            onChange={handleChange}
            required
          />
          {errorMessage && <IsUsernameExist />}
        </div>
        <button className='login_button' type='submit'>
          Log In
        </button>
      </form>
    </>
  );
}
