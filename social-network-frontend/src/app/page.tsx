"use client";

import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import PostList from './components/PostList';
import { getContract } from './utils/contract';

const Home = () => {
  const [provider, setProvider] = useState<any>(null);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [posts, setPosts] = useState<any[]>([]);

  // Fetch the user's address
  const fetchUserAddress = async () => {
    if (provider) {
      const signer = provider.getSigner();
      const address = await signer.address;
      setUserAddress(address);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      if (provider) {
        // Get contract using the provider (read-only methods)
        const contract = await getContract(provider);

        try {
          // Fetch posts using the contract (view method)
          const allPosts = await contract.getAllPosts();  // Read-only call

          // Log the posts to check the structure
          console.log("All Posts:", allPosts);

          // Format the posts correctly based on their structure
          const formattedPosts = allPosts.map((post: any) => {
            return {
              id: Number(post[0]), // Convert BigInt to number
              author: post[1],
              content: post[2],
              imageUrl: post[3],
              likeCount: Number(post[4]), // Convert BigInt to number
            };
          });

          setPosts(formattedPosts);
          await fetchUserAddress();  // Fetch user's address
        } catch (err) {
          console.error("Error fetching posts:", err);
        }
      }
    };

    fetchPosts();
  }, [provider]);

  return (
    <div className="min-h-screen dark-theme">
      <Navbar provider = {provider} setProvider={setProvider} />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Posts</h2>
        <PostList posts={posts} provider={provider} userAddress={userAddress} />
      </div>
    </div>
  );
};

export default Home;
