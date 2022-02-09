import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react/cjs/react.development';
import { getArticleById } from '../utils/api';

export function Article() {
  const {article_id} = useParams()
  const [article, setArticle] = useState({})
  useEffect(() => {
    getArticleById(article_id).then((article) => {
      setArticle(article)
    })
  }, [])

  return (
    <>
      <section>
        <h6>{article.author}</h6>
        <p>Posted on {article.created_at}</p>
        <p>#{article.topic}</p>
        <h1>{article.title}</h1>
        <article>{article.body}</article>
        <p>{article.comment_count}</p>
        <p>{article.votes}</p>

      </section>
    </>
  );
}


