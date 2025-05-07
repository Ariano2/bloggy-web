import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Summaries = () => {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const response = await axios.get(
          'http://localhost:9000/api/blogFeed/summarized/'
        );
        setSummaries(response.data.summariesOfBlogs);
        setLoading(false);
      } catch (err) {
        setError('Failed to load summaries');
        setLoading(false);
        console.log(err);
      }
    };

    fetchSummaries();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error max-w-2xl mx-auto mt-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">AI-Generated Blog Summaries</h1>
      <div className="grid gap-6">
        {summaries
          .filter((blog) => blog.summary !== 'Error: No valid sentences found.')
          .map((blog) => (
            <div
              key={blog.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
            >
              <div className="card-body">
                <h2 className="card-title text-primary">{blog.title}</h2>
                <p className="text-base-content/70">{blog.summary}</p>
                <div className="card-actions justify-end">
                  <Link
                    to={`/blog/${blog.id}`}
                    className="btn btn-outline btn-primary btn-sm"
                  >
                    Read Full Blog
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Summaries;
