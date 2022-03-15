import React from "react";
import { deleteArticleById } from "../utils/api";

function DeleteArticle({ handleClose, articleId, setArticlesList }) {
  const removeArticle = (articleId) => {
    setArticlesList((currList) => {
      const newArticlesList = currList.filter(
        (article) => article.article_id !== articleId
      );
      return newArticlesList;
    });
    handleClose();
    deleteArticleById(articleId);
  };
  return (
    <div className='popup-box'>
      <div className='box'>
        <span className='close-icon' onClick={handleClose}>
          x
        </span>
        <div className='delete_container'>
          <h3>Are you sure you want to delete this comment?</h3>
          <button type='button' onClick={() => removeArticle(articleId)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteArticle;
