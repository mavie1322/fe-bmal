import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { getArticles } from "../utils/api";
import { Link } from "react-router-dom";
import { Queries } from "./Queries";
import { formatDate } from "../utils/utils";
import { NoElement } from "./NoElement";

export function ArticlesList(props) {
  const [articlesList, setArticlesList] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticles(props, sortBy, order).then((articles) => {
      setArticlesList(articles);
      setIsLoading(false);
    });
  }, [props, sortBy, order]);

  if (isLoading) {
    return <NoElement text={"Loading ..."} />;
  }

  return (
    <>
      <Queries sortBy={setSortBy} order={setOrder} />
      <div className='articleList_container'>
        {/* <ul> */}
        {articlesList.length > 0 ? (
          articlesList.map((article) => {
            return (
              <Link
                key={article.article_id}
                to={`/articles/${article.article_id}`}
                className='articlesList_link'>
                {/* <li> */}
                <div className='articlesList_li'>
                  <h3>{article.title}</h3>
                  <span>Posted by {article.author}</span>
                  <section>
                    <p>{article.comment_count} comments</p>
                    {article.votes >= 0 ? (
                      <p className='heart'>{article.votes} ❤️</p>
                    ) : (
                      <p className='heart'>{article.votes} 🖤</p>
                    )}

                    <p>Created on {formatDate(article.created_at)}</p>
                  </section>
                </div>
                {/* </li> */}
              </Link>
            );
          })
        ) : (
          <>
            <NoElement text={"No Articles"} />
          </>
        )}
        {/* </ul> */}
      </div>
    </>
  );
}
