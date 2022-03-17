import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../context/user";
import { getArticles } from "../utils/api";
import { formatDate } from "../utils/utils";
import DeleteArticle from "./DeleteArticle";
import { NoElement } from "./NoElement";
import { PostArticle } from "./PostArticle";
import UserInformation from "./UserInformation";

export function UserProfile() {
  const { loggedInUser } = useContext(UserContext);
  const { username } = useParams();
  const [articlesList, setArticlesList] = useState([]);
  const [articleId, setArticleId] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const text = "No Articles Posted";

  const clickHandler = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (article_id) => {
    setArticleId(article_id);
    setIsDeleted(!isDeleted);
  };

  useEffect(() => {
    getArticles("", "", "").then((articleList) => {
      const articlesByUser = articleList.filter(
        (singleArticle) => singleArticle.author === username
      );
      setArticlesList(articlesByUser);
    });
  }, [username]);

  return (
    <>
      <div className='userProfile_container'>
        <UserInformation username={username} />
        <div className='userArticle'>
          {/* articles posted by the user */}
          <div className='userArticle_title'>
            <h2>Articles Posted</h2>
            {/* unactive Plus Button */}
            {loggedInUser.username === username ? (
              <button
                className='icon'
                id='bigplus'
                onClick={() => clickHandler()}></button>
            ) : null}

            {isOpen && (
              <PostArticle
                handleClose={clickHandler}
                setArticlesList={setArticlesList}
              />
            )}
          </div>
          {articlesList.length > 0 ? (
            <>
              {articlesList.map(
                ({ article_id, title, comment_count, votes, created_at }) => {
                  return (
                    <div className='postedArt-container' key={article_id}>
                      <Link
                        to={`/articles/${article_id}`}
                        className='articlesList_link'>
                        <div className='articlesList_li postedArticle'>
                          <div className='articlesList_button'>
                            <h3>{title}</h3>
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
                      {loggedInUser.username === username ? (
                        <button
                          className='postedArt-btn'
                          onClick={() => handleClick(article_id)}>
                          Delete
                        </button>
                      ) : null}

                      {isDeleted && (
                        <DeleteArticle
                          articleId={articleId}
                          handleClose={handleClick}
                          setArticlesList={setArticlesList}
                        />
                      )}
                    </div>
                  );
                }
              )}
            </>
          ) : (
            <NoElement text={text} />
          )}
        </div>
      </div>
    </>
  );
}
