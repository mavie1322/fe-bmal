import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Article } from "./components/Article";
import { ArticlesList } from "./components/ArticlesList";
import { Nav } from "./components/Nav";
import { Header } from "./components/Header";
import { UserProfile } from "./components/UserProfile";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/topics' element={<Nav />}></Route>
          <Route path='/articles' element={<ArticlesList />}></Route>
          <Route path='/articles/:article_id' element={<Article />}></Route>

          <Route path='/users/:username' element={<UserProfile />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
