"use client"


import CreatePost from '@/app/components/CreatePost';
import Navbar from '@/app/components/Navbar';
import { useState } from 'react';
// import Navbar from '../components/Navbar';
// import CreatePost from '../components/CreatePost';

const CreatePostPage = () => {
  const [provider, setProvider] = useState(null);
  
  return (
    <div className="min-h-screen dark-theme">
      <Navbar setProvider={setProvider} />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
        <CreatePost provider={provider} />
      </div>
    </div>
  );
};

export default CreatePostPage;
