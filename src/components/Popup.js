import React from "react";
import { deleteCommentOnArticle } from "../utils/api";

const Popup = ({ handleClose, setComments, commentId }) => {
  const deleteComment = (comment_id) => {
    setComments((currCommentList) => {
      const newCommentList = currCommentList.filter(
        (singleComment) => singleComment.comment_id !== comment_id
      );
      return newCommentList;
    });
    handleClose(comment_id);
    deleteCommentOnArticle(comment_id);
  };

  return (
    <div className='popup-box'>
      <div className='box'>
        <span className='close-icon' onClick={handleClose}>
          x
        </span>
        <div className='delete_container'>
          <h3>Are you sure you want to delete this comment?</h3>
          <button type='button' onClick={() => deleteComment(commentId)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
