import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedIn = useSelector((store) => store.user.isLoggedIn);

  const handleLogout = () => {
    dispatch(logoutUser());
    alert('User Logged Out');
  };

  return (
    <div className="navbar bg-base-100 shadow px-4">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          bloggY
        </Link>
      </div>

      <div className="flex items-center gap-2">
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
    </div>
  );
};

export default Header;
