import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Feed = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 5;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get(
          `http://localhost:9000/api/blogFeed?page=${page}&limit=${limit}`
        );
        console.log(res.data.blogs);
        setBlogs(res.data.blogs); // Adjust based on API response structure
      } catch (err) {
        setError('Failed to load blog posts ');
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [page]);

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="p-4">
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading &&
        blogs.map((blog) => (
          <div key={blog._id} className="card bg-base-200 shadow-md mb-4">
            <div className="card-body">
              <h2 className="card-title">{blog.title}</h2>
              <p>{blog.title + ' : ' + blog?.des}</p>
              <p>
                {new Date(blog.updatedAt).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
              <div className="card-actions justify-end">
                <button
                  onClick={() => navigate(`/blog/${blog._id}`)}
                  className="btn btn-sm btn-primary"
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}

      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="btn btn-outline btn-sm"
        >
          Prev
        </button>
        <button onClick={handleNext} className="btn btn-outline btn-sm">
          Next
        </button>
      </div>
    </div>
  );
};

export default Feed;
