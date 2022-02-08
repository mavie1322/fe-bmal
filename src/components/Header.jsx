import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'

export function Header() {
  return (
    <nav className='header_nav'>
      <div > 
        <Link className='header_logo' to='/'>BMAL</Link>
      </div>
      <div className='header_loggedUser'>
        <Link to='/users/:username'>Context Api</Link>
      </div>
    </nav>
  );
}


