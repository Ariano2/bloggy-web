import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedIn = useSelector((store) => store.user.isLoggedIn);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    alert('User Logged Out');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar bg-base-100 shadow px-4">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          bloggY
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-2">
        <button
          onClick={() => navigate('/summaries')}
          className="btn btn-primary btn-sm"
        >
          AI Summaries
        </button>
        {loggedIn && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-outline btn-sm">
              Blog Management
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50"
            >
              <li>
                <Link to="/create">Create Blog</Link>
              </li>
              <li>
                <Link to="/my-blogs">My Blogs</Link>
              </li>
            </ul>
          </div>
        )}
        {!loggedIn && (
          <Link to="/auth" className="btn btn-outline btn-sm">
            Login / Signup
          </Link>
        )}
        {loggedIn && (
          <button
            onClick={handleLogout}
            className="btn btn-error btn-outline btn-sm"
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="btn btn-ghost btn-sm"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-base-100 shadow z-50">
          <ul className="menu p-4">
            <li>
              <button
                onClick={() => {
                  navigate('/summaries');
                  setIsMenuOpen(false);
                }}
                className="btn btn-primary btn-sm w-full text-left"
              >
                AI Summaries
              </button>
            </li>
            {loggedIn && (
              <>
                <li>
                  <Link
                    to="/create"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn btn-ghost btn-sm w-full text-left"
                  >
                    Create Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-blogs"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn btn-ghost btn-sm w-full text-left"
                  >
                    My Blogs
                  </Link>
                </li>
              </>
            )}
            {!loggedIn && (
              <li>
                <Link
                  to="/auth"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn btn-outline btn-sm w-full text-left"
                >
                  Login / Signup
                </Link>
              </li>
            )}
            {loggedIn && (
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-error btn-outline btn-sm w-full text-left"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
