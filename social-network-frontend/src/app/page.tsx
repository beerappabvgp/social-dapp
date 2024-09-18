"use client";

import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import PostList from './components/PostList';
import { getContract } from './utils/contract';
import { ethers } from 'ethers';

const Home = () => {
  const [provider, setProvider] = useState<ethers.providers.Provider | null>(null);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [posts, setPosts] = useState<any[]>([]);

  const fetchUserAddress = async () => {
    if (provider) {
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setUserAddress(address);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      if (provider) {
        const contract = getContract(provider);
        const allPosts = await contract.getAllPosts();

        const formattedPosts = allPosts.map((post: any) => ({
          ...post,
          id: post.id.toNumber(),
          likeCount: post.likeCount.toNumber(),
        }));

        setPosts(formattedPosts);
        console.log(formattedPosts);
        await fetchUserAddress(); 
      }
    };

    fetchPosts();
  }, [provider]);

  return (
    <div className="min-h-screen dark-theme">
      <Navbar setProvider={setProvider} />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Posts</h2>
        <PostList posts={posts} provider={provider} userAddress={userAddress} />
      </div>
    </div>
  );
};

export default Home;
