import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    banner: '',
    des: '',
    content: [''],
    tags: [''],
    draft: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // clear field error
  };

  const handleArrayChange = (index, value, type) => {
    const updated = [...form[type]];
    updated[index] = value;
    setForm({ ...form, [type]: updated });
  };

  const addField = (type) => {
    setForm({ ...form, [type]: [...form[type], ''] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?._id) {
      setErrors({ form: 'Login required to create blog.' });
      return;
    }

    const cleanedContent = form.content.filter((p) => p.trim() !== '');
    const cleanedTags = form.tags.filter((t) => t.trim() !== '');

    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required.';
    if (!form.des.trim()) newErrors.des = 'Description is required.';
    if (cleanedContent.length === 0)
      newErrors.content = 'At least one paragraph is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      ...form,
      content: cleanedContent,
      tags: cleanedTags,
      author: user._id,
    };

    try {
      await axios.post('http://localhost:9000/api/blog', payload, {
        withCredentials: true,
      });
      alert('Blog created successfully!');
      navigate('/');
    } catch (err) {
      console.error(err);
      setErrors({ form: 'Failed to create blog.' });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold">Create a New Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        {errors.form && (
          <div className="text-error font-semibold">{errors.form}</div>
        )}

        <input
          type="text"
          name="title"
          placeholder="Title"
          className="input input-bordered w-full"
          value={form.title}
          onChange={handleChange}
        />
        {errors.title && (
          <p className="text-error text-sm mt-1">{errors.title}</p>
        )}

        <input
          type="text"
          name="banner"
          placeholder="Banner URL"
          className="input input-bordered w-full"
          value={form.banner}
          onChange={handleChange}
        />

        <textarea
          name="des"
          placeholder="Short Description"
          className="textarea textarea-bordered w-full"
          value={form.des}
          onChange={handleChange}
        />
        {errors.des && <p className="text-error text-sm mt-1">{errors.des}</p>}

        <div>
          <label className="font-semibold">Content Paragraphs</label>
          {form.content.map((p, i) => (
            <textarea
              key={i}
              className="textarea textarea-bordered w-full mt-1 mb-2"
              value={p}
              onChange={(e) => handleArrayChange(i, e.target.value, 'content')}
              placeholder={`Paragraph ${i + 1}`}
            />
          ))}
          {errors.content && (
            <p className="text-error text-sm mt-1">{errors.content}</p>
          )}
          <button
            type="button"
            className="btn btn-sm btn-outline"
            onClick={() => addField('content')}
          >
            + Add Paragraph
          </button>
        </div>

        <div>
          <label className="font-semibold mr-2">Tags</label>
          {form.tags.map((tag, i) => (
            <div key={i} className="flex items-center gap-2 my-2 mb-2">
              <input
                type="text"
                className="input input-bordered flex-1"
                value={tag}
                onChange={(e) => handleArrayChange(i, e.target.value, 'tags')}
                placeholder={`Tag ${i + 1}`}
              />
              <button
                type="button"
                className="btn btn-xs btn-error"
                onClick={() => {
                  const updatedTags = form.tags.filter(
                    (_, index) => index !== i
                  );
                  setForm({ ...form, tags: updatedTags });
                }}
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-sm btn-outline"
            onClick={() => addField('tags')}
          >
            + Add Tag
          </button>
        </div>

        <label className="label cursor-pointer">
          <span className="label-text">Save as draft?</span>
          <input
            type="checkbox"
            className="checkbox ml-2"
            checked={form.draft}
            onChange={(e) => setForm({ ...form, draft: e.target.checked })}
          />
        </label>

        <button type="submit" className="btn btn-primary w-full">
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
