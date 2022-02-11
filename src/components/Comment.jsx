import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../context/user";
import {
  getCommentsByArticleId,
  updateVoteByComment,
  postCommentOnArticle,
  deleteCommentOnArticle,
} from "../utils/api";
import Popup from "./Popup";

export function Comment({ article_id }) {
  const { loggedInUser } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [textToPost, setTextToPost] = useState("");
  const [votes, setVotes] = useState();
  const [commentId, setCommentId] = useState();
  const [isOpen, setIsOpen] = useState(false)

   const togglePopup = (comment_id) => {
     setCommentId(comment_id);
    setIsOpen(!isOpen);
  }

  const deleteComment = (comment_id) => {
    const newCommentList = comments.filter((singleComment) =>  singleComment.comment_id !== comment_id)
    setComments(newCommentList);
    togglePopup(comment_id);
    deleteCommentOnArticle(comment_id)
  };

  const handleChange = (event) => {
    setTextToPost(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const commentRequested = { username: loggedInUser.username, body: textToPost };
    postCommentOnArticle(article_id, commentRequested).then((commentData) => {
      setComments((currentComments) => {
        const newComments = [...currentComments, commentData];
        return newComments;
      })
      setTextToPost('')
    });
  };

  const cancelComment = () => {
    setTextToPost('')
  };

  const increaseCommentVotes = (comment_id, commentvotes) => {
    setCommentId(comment_id);
    updateVoteByComment(comment_id, { votes: 1 }).then((commentData) => {
      console.log(commentData);
      setVotes(commentData.votes);
    });
  };

  const decreaseCommentVotes = (comment_id) => {
    updateVoteByComment(comment_id, { votes: -1 }).then((comment) => {
      setVotes(comment.votes);
    });
  };

  useEffect(() => {
    getCommentsByArticleId(article_id).then((comments) => {
      setComments(comments);
    });
  }, [article_id]);

  return (
    <>
      <section className='comment_container'>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                <textarea
                  value={textToPost}
                  cols='35'
                  rows='5'
                  onChange={handleChange}></textarea>
              </label>
            </div>

            <div>
              <button type='submit'>Post</button>
              <button type='button' onClick={cancelComment}>
                Cancel
              </button>
            </div>
          </form>
        </div>
        <h5>Discussion({comments.length})</h5>

        {comments.map((comment) => {
          return (
            <article
              key={comment.comment_id}
              className='comment_container comment article'>
              <div>
                <div className='bottom_display'>
                  <Link
                    to={`/users/${comment.author}`}
                    className='articlesList_link'>
                    <p className='comment_author'>{comment.author}</p>
                  </Link>
                  {loggedInUser.username === comment.author ? (
                    <div>
                      <span className='article_delete' onClick={() => togglePopup(comment.comment_id)}>
                        Delete
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <p className='comment_article'>{comment.body}</p>
              </div>
              <div className='bottom_display'>
                <div className='vote'>
                  <button
                    type='button'
                    onClick={() =>
                      increaseCommentVotes(comment.comment_id, comment.votes)
                    }>
                    &#128077;
                  </button>
                  <p>{comment.votes}</p>
                  <button
                    type='button'
                    onClick={() =>
                      decreaseCommentVotes(comment.comment_id, comment.votes)
                    }>
                    &#128078;
                  </button>
                </div>
                <p className='comment_date'>{comment.created_at}</p>
              </div>
            </article>
          );
        })}
        {isOpen && <Popup 
          content={
            <>
            <h3>Are you sure you want to delete this comment?</h3>
            <button type="button" onClick={() => deleteComment(commentId)}>Delete</button>
            </>
          }
          handleClose={togglePopup}
        />}
      </section>
    </>
  );
}
