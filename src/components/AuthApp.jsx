import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { Article } from "./Article";
import { ArticlesList } from "./ArticlesList";
import { Nav } from "./Nav";
import { Header } from "./Header";
import { UserProfile } from "./UserProfile";
import "../App.css";

export function AuthApp() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/topics' element={<Nav />}></Route>
          <Route path='/articles' element={<ArticlesList />}></Route>
          <Route path='/articles/:article_id' element={<Article />}></Route>
          <Route path='/comments/:comment_id' element={}></Route>
          <Route path='/users/:username' element={<UserProfile />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}


