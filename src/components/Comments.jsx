import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/user";
import { getCommentsByArticleId, updateVoteByComment } from "../utils/api";
import { formatDate } from "../utils/utils";
import Popup from "./Popup";
import { PostComment } from "./PostComment";

export function Comments({ article_id }) {
  const { loggedInUser } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [commentVotes, setCommentVotes] = useState();
  const [commentId, setCommentId] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = (comment_id) => {
    setCommentId(comment_id);
    setIsOpen(!isOpen);
  };

  const increaseCommentVotes = async (comment_id, votes) => {
    setCommentId(comment_id);
    const updatedVotes = await updateVoteByComment(comment_id, { votes: 1 });
    setCommentVotes(updatedVotes.votes);
  };

  const decreaseCommentVotes = async (comment_id, votes) => {
    setCommentId(comment_id);
    const updatedVotes = await updateVoteByComment(comment_id, { votes: -1 });
    setCommentVotes(updatedVotes.votes);
  };

  useEffect(() => {
    getCommentsByArticleId(article_id).then((comments) => {
      setComments(comments);
    });
  }, [article_id, commentId]);

  return (
    <>
      {/* post a comment */}
      <section className='comment_container'>
        <PostComment article_id={article_id} setComments={setComments} />
        {/* comments will appear below */}
        <h5>Discussion({comments.length})</h5>

        {comments.length > 0
          ? comments.map(({ comment_id, author, body, votes, created_at }) => {
              return (
                <article
                  key={comment_id}
                  className='comment_container comment article'>
                  <div>
                    <div className='bottom_display'>
                      {/* redirect toward the author profile  */}
                      <Link
                        to={`/users/${author}`}
                        className='articlesList_link'>
                        <p className='comment_author'>{author}</p>
                      </Link>
                      {/* delete span tag appears for comments written by user  */}
                      {loggedInUser.username === author ? (
                        <div>
                          <span
                            className='article_delete'
                            onClick={() => togglePopup(comment_id)}>
                            Delete
                          </span>
                        </div>
                      ) : null}
                      {/* popup window will appear when user want to delete his comments */}
                      {isOpen && (
                        <Popup
                          setComments={setComments}
                          commentId={commentId}
                          handleClose={togglePopup}
                        />
                      )}
                    </div>
                    <p className='comment_article'>{body}</p>
                  </div>
                  {/* like and dislike button */}
                  <div className='bottom_display'>
                    <div className='vote'>
                      <button
                        type='button'
                        onClick={() => increaseCommentVotes(comment_id, votes)}>
                        &#128077;
                      </button>
                      <p>
                        {commentId === comment_id && commentVotes
                          ? commentVotes
                          : votes}
                      </p>
                      <button
                        type='button'
                        onClick={() => decreaseCommentVotes(comment_id, votes)}>
                        &#128078;
                      </button>
                    </div>
                    <p className='comment_date'>{formatDate(created_at)}</p>
                  </div>
                </article>
              );
            })
          : null}
      </section>
    </>
  );
}
