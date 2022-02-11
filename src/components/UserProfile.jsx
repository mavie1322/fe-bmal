import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getArticles, getUserByUsername } from '../utils/api';

export function UserProfile() {
  const {username} = useParams();
  const [user, setUser] = useState({username: '', name:'', avatar_url: '', })
  const [articlesList, setArticleList] = useState([]);

  useEffect(() => {
    getUserByUsername(username).then((commentData) => {
      console.log(commentData)
      setUser(commentData)
    })
  }, [username])

  useEffect(() => {
    getArticles('','','').then((articleList) => {
      const articlesByUser = articleList.filter((singleArticle) => singleArticle.author === username);
      setArticleList(articlesByUser);
    })
  }, [username])

  return <>
  {/* user personal information */}
    <div className='userProfile_container'>
      <div className='userProfile_data'>
        <h3>{user.username}</h3>
        <img src={user.avatar_url} alt={`${user.username} avatar`}/>
        <p>Name : {user.name}</p>
      </div>
      <div className='userArticle'>
        {/* articles posted by the user */}
        <h2>Articles Posted</h2>
        <ul>
          {articlesList.map(({article_id, title, comment_count, votes, created_at}) => {
            return(
              <Link key={article_id} to={`/articles/${article_id}`} className='articlesList_link'>
                <li>
                  <div className='articlesList_li'>
                    <h3>{title}</h3>
                    <section>
                      <p>{comment_count} comments</p>
                      <p>{votes}</p>
                      <p>Created on {created_at}</p>
                    </section>
                  </div>
                </li>
              </Link>
            )
          })}
        </ul>

      </div>
    </div>
  </>;
}

