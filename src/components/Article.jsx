import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticleById, updateVoteByArticle } from "../utils/api";
import { formatDate } from "../utils/utils";
import { Comments } from "./Comments";

export function Article() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});

  const increaseArticleVotes = () => {
    article.votes += 1;
    setArticle((currentArticle) => {
      let newArticle = { ...currentArticle, votes: article.votes };
      return newArticle;
    });
    updateVoteByArticle(article_id, { votes: 1 });
  };

  const decreaseArticleVotes = () => {
    article.votes -= 1;
    setArticle((currentArticle) => {
      let newArticle = { ...currentArticle, votes: article.votes };
      return newArticle;
    });
    updateVoteByArticle(article_id, { votes: -1 });
  };

  useEffect(() => {
    getArticleById(article_id).then((article) => {
      setArticle(article);
    });
  }, [article_id]);

  return (
    <>
      <div className='article_container'>
        <section className='article_section'>
          <div>
            <Link to={`/users/${article.author}`} className='articlesList_link'>
              <h6>{article.author}</h6>
            </Link>
          </div>
          <p className='article_date'>
            Posted on {formatDate(article.created_at)}
          </p>
          <p className='article_hashtag'>#{article.topic}</p>
          <h2>{article.title}</h2>
          <article>{article.body}</article>
          <div className='vote'>
            <button type='button' onClick={() => increaseArticleVotes()}>
              {" "}
              &#128077;
            </button>
            <p>{article.votes}</p>
            <button type='button' onClick={() => decreaseArticleVotes()}>
              &#128078;
            </button>
          </div>
        </section>
        <Comments article_id={article_id} />
      </div>
    </>
  );
}
