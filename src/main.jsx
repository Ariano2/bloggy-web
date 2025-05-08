import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './utils/store.js';
import './index.css';
import App from './App.jsx';
import Home from './components/Home.jsx';
import BlogDetail from './components/BlogDetail.jsx';
import AuthPage from './components/AuthPage.jsx';
import CreateBlog from './components/CreateBlog.jsx';
import ManageBlogs from './components/ManageBlog.jsx';
import EditBlog from './components/editBlog.jsx';
import Summaries from './components/Summaries.jsx';
import { BrowserRouter, Routes, Route } from 'react-router';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/create" element={<CreateBlog />}></Route>
        <Route path="/my-blogs" element={<ManageBlogs />} />
        <Route path="/edit/:blogId" element={<EditBlog />} />
        <Route path="/summaries" element={<Summaries />} />
      </Routes>
    </BrowserRouter>
  </Provider>
  // </StrictMode>
);
