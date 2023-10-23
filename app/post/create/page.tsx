// @ts-nocheck
'use client'

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter()

  const handleCreatePost = async (e) => {
    e.preventDefault();
    // Disable the button and show loading message
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        // Post was created successfully
        setSuccess('Post created successfully');
        setError(null); // Clear any previous errors
        setIsLoading(false);
        // Clear input values
        router.refresh();
      } else {
        // Handle errors
        const data = await response.json();
        setError(data.error || 'An error occurred while creating the post');
        setSuccess(null); // Clear any previous success messages
        setIsLoading(false)

      }
    } catch (error) {
      console.error(error);
      setError('An error occurred while creating the post');
      setSuccess(null); // Clear any previous success messages
      setIsLoading(false)

    }
  };

  return (
    <div className='bg-red-500 p-5 text-center'>
      <h2>Create a New Post</h2>
      <form onSubmit={handleCreatePost}>
        <div className='mb-5'>
          <label htmlFor="title">Title:</label>
          <br />
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="description">Description:</label>
          <br />
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className='px-7 bg-slate-500 mb-3'> {isLoading ? 'Creating...' : 'Create Post'}</button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </div>
  );
};

export default CreatePost;
