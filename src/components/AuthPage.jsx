import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setUser } from '../utils/userSlice';
import axios from 'axios';

const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    age: '',
    email: 'aryan@gmail.com',
    password: '12345',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? 'http://localhost:9000/login'
      : 'http://localhost:9000/signup';
    const payload = isLogin
      ? { email: form.email, password: form.password }
      : {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          age: parseInt(form.age),
          password: form.password,
        };

    try {
      const res = await axios.post(url, payload, { withCredentials: true });
      console.log('Success:', res.data);
      dispatch(setUser(res.data.user));
      alert('Login/Signup successful!');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert(err.response.data);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isLogin ? 'Login' : 'Sign Up'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        {!isLogin && (
          <>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="input input-bordered w-full"
              value={form.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="input input-bordered w-full"
              value={form.lastName}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              className="input input-bordered w-full"
              value={form.age}
              onChange={handleChange}
              required
            />
          </>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input input-bordered w-full"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input input-bordered w-full"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button className="btn btn-primary w-full" type="submit">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>

      <div className="text-center mt-4">
        <button
          className="text-blue-600 underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
