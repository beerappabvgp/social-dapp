"use client";

import PostCard from './PostCard';
import { ethers } from 'ethers';

const PostList = ({ posts, provider, userAddress }: { posts: any[], provider: any, userAddress: string | null }) => {
  return (
    <div className="space-y-4">
      {posts.map((post: any) => (
        <PostCard key={post.id} post={post} provider={provider} userAddress={userAddress} />
      ))}
    </div>
  );
};

export default PostList;
