import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticles, getUserByUsername } from "../utils/api";
import { formatDate } from "../utils/utils";

export function UserProfile() {
  const { username } = useParams();
  const [user, setUser] = useState({ username: "", name: "", avatar_url: "" });
  const [articlesList, setArticleList] = useState([]);

  useEffect(() => {
    getUserByUsername(username).then((commentData) => {
      setUser(commentData);
    });
  }, [username]);

  useEffect(() => {
    getArticles("", "", "").then((articleList) => {
      const articlesByUser = articleList.filter(
        (singleArticle) => singleArticle.author === username
      );
      setArticleList(articlesByUser);
    });
  }, [username]);

  return (
    <>
      {/* user personal information */}
      <div className='userProfile_container'>
        <div className='userProfile_data'>
          <h3>{user.username}</h3>
          <img src={user.avatar_url} alt={`${user.username} avatar`} />
          <p>Name : {user.name}</p>
        </div>
        <div className='userArticle'>
          {/* articles posted by the user */}
          <div className='userArticle_title'>
            <h2>Articles Posted</h2>
            <input className='more_input' type='button' value='+' />
          </div>
          {articlesList.map(
            ({ article_id, title, comment_count, votes, created_at }) => {
              return (
                <Link
                  key={article_id}
                  to={`/articles/${article_id}`}
                  className='articlesList_link'>
                  <div className='articlesList_li'>
                    <div className='articlesList_button'>
                      <h3>{title}</h3>
                      <div className='articlesList_input'>
                        <input type='button' value='Edit' />
                        <input type='button' value='Delete' />
                      </div>
                    </div>
                    <section>
                      <p>{comment_count} comments</p>
                      {votes >= 0 ? (
                        <p className='heart'>{votes} ❤️</p>
                      ) : (
                        <p className='heart'>{votes} 🖤</p>
                      )}

                      <p>Created on {formatDate(created_at)}</p>
                    </section>
                  </div>
                </Link>
              );
            }
          )}
        </div>
      </div>
    </>
  );
}
