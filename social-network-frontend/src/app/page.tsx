"use client";

import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import PostList from './components/PostList';
import { getContract } from './utils/contract';
import { ethers } from 'ethers';
import { useAuth } from './context/AuthContext';

const Home = () => {
  const [provider, setProvider] = useState<any>(null);
  // const { provider , setProvider } = useWalletProvider();
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [posts, setPosts] = useState<any[]>([]);

  const fetchUserAddress = async () => {
    if (provider) {
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setUserAddress(address);
    }
  };

  const { isLoggedIn } = useAuth();

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

    if (provider) {
      fetchPosts();
    }
  }, [provider]);

  return (
    <div className="min-h-screen dark-theme">
      <Navbar setProvider={setProvider} />
      <div className="container mx-auto p-4">
        {
          isLoggedIn? (
            <>
              <h2 className="text-2xl font-bold text-blue-500 border-2 border-cyan-400 p-4 rounded-2xl text-center mt-10 mb-10">Posts</h2>
              <PostList posts={posts} provider={provider} userAddress={userAddress} />
            </>
          ) : (
            <div className="text-2xl font-bold mb-4 text-blue-500 border-2 border-cyan-400 p-4 rounded-2xl text-center">Please SignIn to see posts</div>
          )
        }
      </div>
    </div>
  );
};

export default Home;
