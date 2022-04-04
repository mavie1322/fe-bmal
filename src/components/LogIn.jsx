import React, { useState } from "react";
import { getUserByUsername } from "../utils/api";
import IsUsernameExist from "./IsUsernameExist";
import "../App.css";

const getLocalStorage = () => {
  let storedName = localStorage.getItem("signedName");
  if (storedName) {
    return (list = localStorage.getItem("signedName"));
    add;
  } else {
    return "";
  }
};

export function LogIn({ setLoggedInUser }) {
  const [signedName, setSignedName] = useState(getLocalStorage);
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
        }
      })
      .catch(() => {
        setErrorMessage(true);
      });
  };

  const handleChange = (event) => {
    const usernameEntered = event.target.value;
    // setSignedName(usernameEntered)
    localStorage.setItem(usernameEntered);
  };

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
