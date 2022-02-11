import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../context/user';
import { getCommentsByArticleId, updateVoteByComment } from '../utils/api';

export function Comment({article_id}) {

  const {loggedInUser} = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [textToPost, setTextToPost] = useState('')
  const [votes, setVotes] = useState();
  const [commentId, setCommentId] = useState();

   const handleClick = () => {
    alert('Comment deleted');
  };
  
  const handleChange = (event) => {
   
    setTextToPost(event.target.value)
  };

  const postComment = () => {

  };

  const cancelComment = () => {

  };

  const increaseCommentVotes = (comment_id, commentvotes) => {
    setCommentId(comment_id)
    console.log(commentvotes)
    updateVoteByComment(comment_id, {votes: 1}).then((commentData) => {
      console.log(commentData)
      setVotes(commentData.votes);
    })
  };

  const decreaseCommentVotes = (comment_id) => {
    updateVoteByComment(comment_id, {votes: -1}).then((comment) => {
      setVotes(comment.votes)
    })
  };
  
  useEffect(() => {
    getCommentsByArticleId(article_id).then((comments) => {
      setComments(comments)
    });
  }, [article_id]);

  return (
    <>
      
      <section className='comment_container'>
        <h5>Discussion({comments.length})</h5>
        <div>
          <textarea value='' cols="30" rows="10" onChange={handleChange}></textarea>
          <div>
            <button type='submit' onClick={postComment}>Post</button>
            <button type='submit' onClick={cancelComment}>Cancel</button>
          </div>
        </div>
        <div>
        </div>
        {comments.map((comment) => {
          return(
            <article key={comment.comment_id} className='comment_container comment article'>
              <div>
                <div className='bottom_display'>
                  <Link to={`/users/${comment.author}`} className='articlesList_link'>
                    <p className='comment_author'>{comment.author}</p>
                  </Link>
                  {
                    loggedInUser.username === comment.author ?
                    (<div>
                      <span className='article_delete' onClick={handleClick}>Delete</span>
                    </div>) : ''
                  }  
                </div>
                <p className='comment_article'>{comment.body}</p>
              </div>
              <div className='bottom_display'>
                <div className='vote'>
                  <button type='button' onClick={() => increaseCommentVotes(comment.comment_id, comment.votes)}>&#128077;</button>
                  <p>{comment.votes}</p>
                  <button type='button' onClick={() => decreaseCommentVotes(comment.comment_id, comment.votes)}>&#128078;</button>
                </div > 
                <p className='comment_date'>{comment.created_at}</p>
              </div> 
            </article>
          );
        })}
      </section>
    </>
  )
}
