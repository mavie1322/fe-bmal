import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react/cjs/react.development';
import { getArticleById, getCommentsByArticleId } from '../utils/api';

export function Article() {
  const {article_id} = useParams()
  const [article, setArticle] = useState({})
  const [comments, setComments] = useState([])
  useEffect(() => {
    getArticleById(article_id).then((article) => {
      setArticle(article)
    })
  }, [article_id])

  useEffect(() => {
    getCommentsByArticleId(article_id).then((comments) => {
      setComments(comments)
    });
  }, [article_id])

  return (
    <>
    <div className='article_container'>
      <section className='article_section'>
        <div>
          <Link to={`/users/${article.author}`} className='articlesList_link'>
            <h6>{article.author}</h6>
          </Link>
        </div>
        <p className='article_date'>Posted on {article.created_at}</p>
        <p className='article_hashtag'>#{article.topic}</p>
        <h2>{article.title}</h2>
        <article>{article.body}</article>
        <div className='vote'>
          <button>	&#128077;</button>
          <p>{article.votes}</p>
          <button>&#128078;</button>
        </div>
      </section>
      <section className='comment_container'>
        <h5>Discussion({comments.length})</h5>
        <di>
          <p></p>
        </di>
        {comments.map((comment) => {
          return(
            <article key={comment.comment_id} className='comment_container comment article'>
              <div>
                <div className='bottom_display'>
                  <Link to={`/users/${comment.author}`} className='articlesList_link'>
                    <p className='comment_author'>{comment.author}</p>
                  </Link>
                  <div>
                    <select name="" id="">
                      
                    </select>
                  </div>
                  <p>Edit</p>
                </div>
              <p>{comment.body}</p>
              </div>
              <div className='bottom_display'>
              <div className='vote'>
                <button>	&#128077;</button>
                <p>{comment.votes}</p>
                <button>&#128078;</button>
              </div > 
                <p className='comment_date'>{comment.created_at}</p>
              </div> 
            </article>
          );
        })}
      </section>
      </div>
    </>
  );
}


