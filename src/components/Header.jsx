import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'
import { UserContext } from '../context/user';

export function Header() {
  const {loggedInUser} = useContext(UserContext);

  return (
    <nav className='header_nav'>
      <div > 
        <Link className='header_logo' to='/'>BMAL</Link>
      </div>
      <div className='header_loggedUser'>
        <Link to={`/users/${loggedInUser.username}`}>
          <div>
            <img src={loggedInUser.avatar_url} alt={loggedInUser.name + 'avatar'} className='header_loggedUser_img'/>
            <p>{loggedInUser.name}</p>
          </div>
        </Link>
      </div>
    </nav>
  );
}


