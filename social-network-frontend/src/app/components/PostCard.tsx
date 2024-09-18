"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getContract } from "../utils/contract";

interface Post {
  id: number;
  author: string;
  content: string;
  imageUrl?: string;
  likeCount: number;
}

interface PostCardProps {
  post: Post;
  provider: ethers.providers.Provider | null;
  userAddress: string | null;
}

const PostCard = ({ post, provider, userAddress }: PostCardProps) => {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [likes, setLikes] = useState(post.likeCount);

  useEffect(() => {
    const checkIfLiked = async () => {
      if (provider && userAddress) {
        const contract = getContract(provider);
        const hasLiked = await contract.hasLikedPost(userAddress, post.id);
        setLiked(hasLiked);
      }
    };

    checkIfLiked();
  }, [provider, userAddress, post.id]);

  const handleLike = async () => {
    if (!provider) {
      alert("Please connect wallet first");
      return;
    }

    if (liked) {
      alert("You have already liked this post.");
      return;
    }

    setLoading(true);
    try {
      const contract = getContract(provider);
      await contract.likePost(post.id);
      setLiked(true);
      setLikes(likes + 1);
    } catch (error) {
      alert("Failed to like the post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white border rounded-lg shadow-md max-w-md mx-auto sm:max-w-lg md:max-w-2xl">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.author}</h3>
      <p className="text-gray-700 mb-4">{post.content}</p>

      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={`Post image`}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}

      <div className="flex items-center space-x-2 mt-4">
        <span className="text-gray-600">{likes} Likes</span>

        {liked ? (
          <span className="text-green-600 font-semibold">Liked</span>
        ) : (
          <button
            onClick={handleLike}
            className={`text-blue-600 font-semibold hover:text-blue-800 ${
              liked ? "bg-blue-100 cursor-not-allowed" : ""
            }`}
            disabled={liked || loading}
          >
            {loading ? "Liking..." : "Like"}
          </button>
        )}
      </div>
    </div>
  );
};

export default PostCard;
