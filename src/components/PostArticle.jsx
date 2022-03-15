import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/user";
import { getTopics, postArticle } from "../utils/api";

export function PostArticle({ handleClose, setArticlesList }) {
  const { loggedInUser } = useContext(UserContext);
  const [topics, setTopics] = useState([]);
  const [articleToPost, setArticleToPost] = useState({
    author: loggedInUser.username,
    title: "",
    body: "",
    topic: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    postArticle(articleToPost).then((postedArticle) => {
      setArticlesList((currList) => {
        return [postedArticle, ...currList];
      });
      setArticleToPost({
        author: loggedInUser.username,
        title: "",
        body: "",
        topic: "",
      });
      alert("Article Published");
    });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setArticleToPost({ ...articleToPost, [name]: value });
  };

  useEffect(() => {
    getTopics().then((topics) => {
      setTopics(topics);
    });
  }, []);

  return (
    <div className='popup-box'>
      <div className='box'>
        <span className='close-icon' onClick={handleClose}>
          x
        </span>
        <div className='post-article-container'>
          <form onSubmit={handleSubmit}>
            <h3>Post your article</h3>
            <div className='article-topic-container'>
              <select
                name='topic'
                onChange={handleChange}
                value={articleToPost.topic}>
                <option value=''>Topics</option>
                {topics.map((topic) => {
                  return <option value={topic.slug}>{topic.slug}</option>;
                })}
              </select>
            </div>
            <div className='article-title-container'>
              <label>Title: </label>
              <input
                type='text'
                name='title'
                onChange={handleChange}
                value={articleToPost.title}
                required
              />
            </div>
            <div className='textarea-container'>
              <textarea
                name='body'
                value={articleToPost.body}
                placeholder='Write your content here..'
                cols='30'
                rows='30'
                onChange={handleChange}></textarea>
            </div>
            <button type='submit'>Publish</button>
          </form>
        </div>
      </div>
    </div>
  );
}
