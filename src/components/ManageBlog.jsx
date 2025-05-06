import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const response = await axios.get(
          'http://localhost:9000/api/blog/user',
          {
            withCredentials: true,
          }
        );
        setBlogs(response.data.blogList || []);
        console.log(response.data.blogList);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBlogs();
  }, []);

  if (loading) return <div className="text-center p-10">Loading blogs...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Manage Your Blogs</h2>
        <button
          onClick={() => navigate('/')}
          className="btn btn-outline btn-sm"
        >
          ⬅ Back to Home
        </button>
      </div>

      {blogs.length === 0 ? (
        <p>No blogs created yet.</p>
      ) : (
        <div className="grid gap-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="card bg-base-200 shadow p-4">
              <div className="flex flex-col md:flex-row gap-4">
                {blog.banner && (
                  <img
                    src={blog.banner}
                    alt="banner"
                    className="w-full md:w-52 h-32 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{blog.title}</h3>
                  <p className="text-sm text-gray-500 mb-1">{blog.des}</p>
                  <p className="text-xs mb-2 text-gray-400">
                    Published: {new Date(blog.publishedAt).toLocaleString()}
                  </p>
                  <div className="text-sm flex gap-4 mb-2">
                    <span>👍 {blog.activity.total_likes} Likes</span>
                    <span>💬 {blog.activity.total_comments} Comments</span>
                    <span>👁️ {blog.activity.total_reads} Reads</span>
                  </div>
                  <Link
                    to={`/edit/${blog._id}`}
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    Edit Blog
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageBlogs;
