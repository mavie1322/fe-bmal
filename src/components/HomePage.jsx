import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Home} from './Home';

export function HomePage() {
  return (
    <BrowserRouter>
        <div>
           <p>Home Page</p> 
           <Routes>
               <Route path='/' element={<Home />}/>
           </Routes>
        </div>
    </BrowserRouter>
  );
}

