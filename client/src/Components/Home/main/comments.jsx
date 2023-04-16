/* eslint-disable react/no-array-index-key */
import { useState } from 'react';
import { AiFillHeart, AiOutlineComment } from 'react-icons/ai';

function LikeCommentAccordion({ initialLikes = 0, initialComments = [] }) {
  const [likes, setLikes] = useState(initialLikes);
  const [comments, setComments] = useState(initialComments);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleLikeClick = () => {
    setLikes((prevLikes) => prevLikes + 1);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      setComments((prevComments) => [...prevComments, newComment.trim()]);
      setNewComment('');
    }
  };

  return (
    <div className="like-comment-accordion">
      <div className="like-comment">
        <button type="button" className="like-button" onClick={handleLikeClick}>
          <AiFillHeart />
          <span className="likes">{likes}</span>
        </button>
        <button
          type="button"
          className="comment-button"
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        >
          <AiOutlineComment />
          <span className="comments">{comments.length}</span>
        </button>
      </div>
      {isAccordionOpen && (
        <div className="accordion">
          {comments.map((comment, index) => (
            <div className="comment" key={index}>
              {comment}
            </div>
          ))}
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default LikeCommentAccordion;
