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
import { PostComment } from "./PostComment";

export function Comment({ article_id }) {
  const { loggedInUser } = useContext(UserContext);
  const [comments, setComments] = useState([]);
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
    {/* post a comment */}
      <section className='comment_container'>
        <PostComment article_id={article_id} setComments={setComments}/>
        {/* comments will appear below */}
        <h5>Discussion({comments.length})</h5>
        {comments.map(({comment_id, author, body, votes, created_at}) => {
          return (
            <article
              key={comment_id}
              className='comment_container comment article'>
              <div>
                <div className='bottom_display'>
                  {/* redirect toward the user profile 
                  delete span tage appears for comments written by user */}
                  <Link
                    to={`/users/${author}`}
                    className='articlesList_link'>
                    <p className='comment_author'>{author}</p>
                  </Link>
                  {loggedInUser.username === author ? (
                    <div>
                      <span className='article_delete' onClick={() => togglePopup(comment_id)}>
                        Delete
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <p className='comment_article'>{body}</p>
              </div>
              {/* like and dislike button */}
              <div className='bottom_display'>
                <div className='vote'>
                  <button
                    type='button'
                    onClick={() =>
                      increaseCommentVotes(comment_id, votes)
                    }>
                    &#128077;
                  </button>
                  <p>{votes}</p>
                  <button
                    type='button'
                    onClick={() =>
                      decreaseCommentVotes(comment_id, votes)
                    }>
                    &#128078;
                  </button>
                </div>
                <p className='comment_date'>{created_at}</p>
              </div>
            </article>
          );
        })}
        {/* popup window will appear when user want to delete his comments */}
        {isOpen && <Popup 
          content={
            <>
            <div className="delete_container">
              <h3>Are you sure you want to delete this comment?</h3>
              <button type="button" onClick={() => deleteComment(commentId)}>Delete</button>
            </div>
            </>
          }
          handleClose={togglePopup}
        />}
      </section>
    </>
  );
}
