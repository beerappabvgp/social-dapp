


// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract SocialNetwork {
    // Events for tracking actions
    event NewPost(address indexed user, uint256 postId, string content, string image);
    event PostLiked(address indexed user, uint256 indexed postId);

    // Struct to store information about a post
    struct Post {
        uint256 id;              // Post ID
        address author;          // Author's address
        string content;          // Post text content
        string imageUrl;         // Image link (optional)
        uint256 likeCount;       // Number of likes
    }

    // Struct to store user's liked posts (to prevent multiple likes on the same post)
    struct UserProfile {
        bool registered;         // User registration check
        mapping(uint256 => bool) likedPosts;  // Mapping to store liked post IDs
    }

    // Counter for post ID (gas efficient, as no need to store in a dynamic array)
    uint256 private postCounter;

    // Mapping of Post ID to Post struct
    mapping(uint256 => Post) public posts;

    // Array to store all post IDs
    uint256[] private postIds;

    // Mapping of address to UserProfile (for tracking liked posts)
    mapping(address => UserProfile) private users;

    // Register the user if they are not already registered
    modifier onlyRegistered() {
        if (!users[msg.sender].registered) {
            users[msg.sender].registered = true;
        }
        _;
    }

    // Create a new post
    function createPost(string memory _content, string memory _imageUrl) external onlyRegistered {
        require(bytes(_content).length > 0, "Post content cannot be empty");

        // Increment post ID counter
        uint256 newPostId = ++postCounter;

        // Save the post
        posts[newPostId] = Post({
            id: newPostId,
            author: msg.sender,
            content: _content,
            imageUrl: _imageUrl,
            likeCount: 0
        });

        // Store the post ID
        postIds.push(newPostId);

        // Emit the event
        emit NewPost(msg.sender, newPostId, _content, _imageUrl);
    }

    // Like a post
    function likePost(uint256 _postId) external onlyRegistered {
        require(_postId > 0 && _postId <= postCounter, "Invalid post ID");
        require(!users[msg.sender].likedPosts[_postId], "Already liked this post");

        // Increase like count
        posts[_postId].likeCount += 1;

        // Mark post as liked by the user
        users[msg.sender].likedPosts[_postId] = true;

        // Emit the event
        emit PostLiked(msg.sender, _postId);
    }

    // Get the number of likes on a post
    function getLikeCount(uint256 _postId) external view returns (uint256) {
        require(_postId > 0 && _postId <= postCounter, "Invalid post ID");
        return posts[_postId].likeCount;
    }

    // Get post by ID
    function getPost(uint256 _postId) external view returns (Post memory) {
        require(_postId > 0 && _postId <= postCounter, "Invalid post ID");
        return posts[_postId];
    }

    // Check if a user has liked a post
    function hasLikedPost(address _user, uint256 _postId) external view returns (bool) {
        require(_postId > 0 && _postId <= postCounter, "Invalid post ID");
        return users[_user].likedPosts[_postId];
    }

    // Get all posts
    function getAllPosts() external view returns (Post[] memory) {
        Post[] memory allPosts = new Post[](postIds.length);
        for (uint256 i = 0; i < postIds.length; i++) {
            allPosts[i] = posts[postIds[i]];
        }
        return allPosts;
    }
}
