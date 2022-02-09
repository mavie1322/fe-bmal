import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import { getArticles } from '../utils/api';
import { Link } from 'react-router-dom';
import { Queries } from './Queries';

export function ArticlesList(props) {
  const [articlesList, setArticlesList] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('')

  useEffect(() => {
    getArticles(props, sortBy, order).then((articles) => {
      setArticlesList(articles)
    })
  }, [props,sortBy, order]);
  

  return (
    <>
    <Queries sortBy={setSortBy} order={setOrder}/>
    <div>
      <ul>
        {articlesList.map((article)=>{
          return (
          <Link key={article.article_id} to={`/articles/${article.article_id}`}>
            <li>
              <h6>{article.title}</h6>
              <span>Posted by:{article.author}</span>
              <p>{article.comment_count} Comments</p>
              <p>{article.votes}</p>
              <p>Created at {article.created_at}</p>
            </li>
          </Link>
          );
        })}
      </ul>
    </div>
    </>
  );
}


