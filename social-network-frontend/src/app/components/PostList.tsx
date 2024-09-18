"use client"


import PostCard from './PostCard';

const PostList = ({ posts , provider } : any) => {
  return (
    <div className="space-y-4">
      {posts.map((post : any) => (
        <PostCard key={post.id} post={post} provider = {provider} />
      ))}
    </div>
  );
};

export default PostList;
