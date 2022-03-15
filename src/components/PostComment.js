import React, { useContext, useState } from "react";
import { UserContext } from "../context/user";
import { postCommentOnArticle } from "../utils/api";

export function PostComment({ article_id, setComments }) {
  const [textToPost, setTextToPost] = useState("");
  const { loggedInUser } = useContext(UserContext);
  const handleChange = (event) => {
    setTextToPost(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (textToPost) {
      const commentRequested = {
        username: loggedInUser.username,
        body: textToPost,
      };

      postCommentOnArticle(article_id, commentRequested).then((commentData) => {
        setComments((currentComments) => {
          const newComments = [commentData, ...currentComments];
          return newComments;
        });
        setTextToPost("");
      });
    }
  };

  const cancelComment = () => {
    setTextToPost("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className='comment_post'>
        <div>
          <label>
            <textarea
              value={textToPost}
              cols='40'
              rows='5'
              onChange={handleChange}></textarea>
          </label>
        </div>

        <div className='postComment-btn'>
          <button type='submit'>Post your comment</button>
          <button type='button' onClick={cancelComment}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
