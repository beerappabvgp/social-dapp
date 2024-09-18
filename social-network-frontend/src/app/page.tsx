"use client";

import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import PostList from './components/PostList';
import { getContract } from './utils/contract';
import { ethers } from 'ethers';

const Home = () => {
  const [provider, setProvider] = useState<ethers.providers.Provider | null>(null);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (provider) {
        const contract = getContract(provider);
        const allPosts = await contract.getAllPosts();

        const formattedPosts = allPosts.map((post: any) => ({
          ...post,
          id: post.id.toNumber(), 
          likeCount: post.likeCount.toNumber() 
        }));

        setPosts(formattedPosts);
      }
    };

    fetchPosts();
  }, [provider]); 

  return (
    <div className="min-h-screen dark-theme">
      <Navbar setProvider={setProvider} />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Posts</h2>
        <PostList posts={posts} provider={provider} />
      </div>
    </div>
  );
};

export default Home;
