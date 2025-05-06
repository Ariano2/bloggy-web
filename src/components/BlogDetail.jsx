import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Comment from './Comment';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingBlog, setLoadingBlog] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/api/blogFeed/${id}`);
        setBlog(res.data);
      } catch (err) {
        setError('Failed to fetch blog.');
        console.error(err);
      } finally {
        setLoadingBlog(false);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/api/comment/fetch/${id}`
        );
        setComments(res.data.comments);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingComments(false);
      }
    };

    fetchBlog();
    fetchComments();
  }, [id]);

  const refreshComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:9000/api/comment/fetch/${id}`
      );
      setComments(res.data.comments);
    } catch (err) {
      console.error('Failed to refresh comments:', err);
    }
  };

  if (loadingBlog) return <div className="p-4">Loading blog...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  const formattedDate = new Date(blog.blog.updatedAt).toLocaleString('en-GB');

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{blog.blog.title}</h1>
      <p className="text-sm text-gray-500">
        By <span className="font-semibold">{blog.blog.author.firstName}</span> •
        Updated: {formattedDate}
      </p>
      <hr className="my-4" />

      {blog.blog.content.length > 0 &&
        blog.blog.content.map((para, idx) => (
          <p key={idx} className="mb-4 text-base leading-relaxed">
            {para}
          </p>
        ))}

      <hr className="my-6" />

      <h2 className="text-2xl font-semibold mb-4">Comments</h2>
      {loadingComments ? (
        <p>Loading comments...</p>
      ) : (
        <Comment
          blogId={id}
          comments={comments}
          onCommentAdded={refreshComments}
        />
      )}
    </div>
  );
};

export default BlogDetail;
