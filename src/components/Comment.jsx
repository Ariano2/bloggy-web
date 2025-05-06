import React, { useState } from 'react';
import axios from 'axios';

const Comment = ({ blogId, comments, onCommentAdded }) => {
  const [newComment, setNewComment] = useState('');
  const [replyBoxes, setReplyBoxes] = useState({});
  const [replies, setReplies] = useState({});

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    try {
      await axios.post(
        `http://localhost:9000/api/comment/add/${blogId}`,
        { comment: newComment },
        { withCredentials: true }
      );
      setNewComment('');
      onCommentAdded();
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const handleReplyToggle = (commentId) => {
    setReplyBoxes((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleReplyChange = (commentId, value) => {
    setReplies((prev) => ({
      ...prev,
      [commentId]: value,
    }));
  };

  const handleReplySubmit = async (parentCommentId) => {
    const replyText = replies[parentCommentId];
    if (!replyText?.trim()) return;
    try {
      await axios.post(
        `http://localhost:9000/api/comment/reply/${parentCommentId}`,
        { comment: replyText },
        { withCredentials: true }
      );
      setReplies((prev) => ({ ...prev, [parentCommentId]: '' }));
      setReplyBoxes((prev) => ({ ...prev, [parentCommentId]: false }));
      onCommentAdded();
    } catch (err) {
      console.error('Error posting reply:', err);
    }
  };

  // Step 1: Create a map of replies grouped by parent ID
  const replyMap = comments.reduce((acc, comment) => {
    if (comment.isReply && comment.parent) {
      if (!acc[comment.parent]) acc[comment.parent] = [];
      acc[comment.parent].push(comment);
    }
    return acc;
  }, {});

  // Step 2: Filter out top-level comments
  const topLevelComments = comments.filter((c) => !c.isReply);

  // Step 3: Render a comment and its replies (not recursive here but can be)
  const renderComment = (comment) => (
    <div key={comment._id} className="mb-4 p-4 bg-base-200 rounded">
      <div className="flex justify-between">
        <p className="text-sm font-medium text-blue-600">
          {comment.commented_by?.firstName || 'Anonymous'}
        </p>
        <span className="text-xs text-gray-500">
          {new Date(comment.commentedAt).toLocaleString('en-GB')}
        </span>
      </div>
      <p className="mb-2">{comment.comment}</p>
      <button
        onClick={() => handleReplyToggle(comment._id)}
        className="btn btn-xs btn-outline btn-secondary mb-2"
      >
        {replyBoxes[comment._id] ? 'Cancel' : 'Reply'}
      </button>
      {replyBoxes[comment._id] && (
        <div className="ml-4">
          <textarea
            value={replies[comment._id] || ''}
            onChange={(e) => handleReplyChange(comment._id, e.target.value)}
            placeholder="Write a reply..."
            className="textarea textarea-bordered w-full mb-2"
          />
          <button
            onClick={() => handleReplySubmit(comment._id)}
            className="btn btn-sm btn-accent"
          >
            Post Reply
          </button>
        </div>
      )}

      {/* Render replies under this comment */}
      {replyMap[comment._id]?.map((reply) => (
        <div
          key={reply._id}
          className="ml-6 mt-2 p-2 border-l border-gray-400 bg-base-100 rounded"
        >
          <div className="flex justify-between">
            <p className="text-sm font-medium text-blue-600">
              {reply.commented_by?.firstName || 'Anonymous'}
            </p>
            <span className="text-xs text-gray-500">
              {new Date(reply.commentedAt).toLocaleString('en-GB')}
            </span>
          </div>
          <p className="text-base-content">{reply.comment}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write a comment..."
        className="textarea textarea-bordered w-full mb-2"
      />
      <button
        onClick={handleCommentSubmit}
        className="btn btn-primary btn-sm mb-6"
      >
        Post Comment
      </button>

      {topLevelComments.map((comment) => renderComment(comment))}
    </div>
  );
};

export default Comment;
