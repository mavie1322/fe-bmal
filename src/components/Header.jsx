import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { UserContext } from "../context/user";

export function Header() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const handleLogout = () => {
    setLoggedInUser((loggedInUser) => ({
      username: "",
      avatar_url: "",
      name: "",
      auth: false,
    }));
    localStorage.clear();
  };

  return (
    <nav className='header_nav'>
      <div>
        <Link className='header_logo' to='/'>
          BMAL
        </Link>
      </div>
      <div className='header_loggedUser'>
        <Link to={`/users/${loggedInUser.username}`}>
          <div className='header_loggedUser_div'>
            <img
              src={loggedInUser.avatar_url}
              alt={loggedInUser.name + "avatar"}
              className='header_loggedUser_img'
            />
            <input
              type='button'
              value='Log out'
              onClick={() => handleLogout()}
            />
          </div>
        </Link>
      </div>
    </nav>
  );
}
