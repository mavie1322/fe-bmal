import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Article } from "./components/Article";
import { ArticlesList } from "./components/ArticlesList";
import { Nav } from "./components/Nav";
import { Header } from "./components/Header";
import { UserProfile } from "./components/UserProfile";
import "./App.css";
import { LogIn } from "./components/LogIn";
import { userContext } from "./context/user";
import { useState } from "react";

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    username: "",
    avatar_url: "",
    name: "",
  });
  return (
    <>
      <BrowserRouter>
        <userContext.Provider value={{ loggedInUser, setLoggedInUser }}>
          <Header />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/topics' element={<Nav />}></Route>
            <Route path='/articles' element={<ArticlesList />}></Route>
            <Route path='/articles/:article_id' element={<Article />}></Route>

            <Route path='/users/:username' element={<UserProfile />}></Route>
          </Routes>
        </userContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
