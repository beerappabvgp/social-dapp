// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract SocialNetwork {
    
    event NewPost(address indexed user, uint256 postId, string content, string image);
    event PostLiked(address indexed user, uint256 indexed postId);

    error PostContentEmpty();
    error InvalidPostId();
    error AlreadyLikedPost();
    error UsernameEmpty();
    error UserNotRegistered();

    struct Post {
        uint256 id;              
        address author;          
        string content;          
        string imageUrl;         
        uint256 likeCount;       
    }

    struct UserProfile {
        bool registered;         
        string username;         
        mapping(uint256 => bool) likedPosts;  
    }

    uint256 private postCounter;
    mapping(uint256 => Post) public posts;
    uint256[] private postIds;
    address[] private userAddresses;
    mapping(address => UserProfile) private users;

    modifier onlyRegistered() {
        if (!users[msg.sender].registered) {
            users[msg.sender].registered = true;
            userAddresses.push(msg.sender); 
        }
        _;
    }

    function createPost(string memory _content, string memory _imageUrl) external onlyRegistered {
        if (bytes(_content).length == 0) {
            revert PostContentEmpty();
        }

        uint256 newPostId = ++postCounter;

        posts[newPostId] = Post({
            id: newPostId,
            author: msg.sender,
            content: _content,
            imageUrl: _imageUrl,
            likeCount: 0
        });

        postIds.push(newPostId);
        emit NewPost(msg.sender, newPostId, _content, _imageUrl);
    }

    function likePost(uint256 _postId) external onlyRegistered {
        if (_postId == 0 || _postId > postCounter) {
            revert InvalidPostId();
        }
        if (users[msg.sender].likedPosts[_postId]) {
            revert AlreadyLikedPost();
        }

        posts[_postId].likeCount += 1;
        users[msg.sender].likedPosts[_postId] = true;

        emit PostLiked(msg.sender, _postId);
    }

    function getLikeCount(uint256 _postId) external view returns (uint256) {
        if (_postId == 0 || _postId > postCounter) {
            revert InvalidPostId();
        }
        return posts[_postId].likeCount;
    }

    function getPost(uint256 _postId) external view returns (Post memory) {
        if (_postId == 0 || _postId > postCounter) {
            revert InvalidPostId();
        }
        return posts[_postId];
    }

    function hasLikedPost(address _user, uint256 _postId) external view returns (bool) {
        if (_postId == 0 || _postId > postCounter) {
            revert InvalidPostId();
        }
        return users[_user].likedPosts[_postId];
    }

    function getAllPosts() external view returns (Post[] memory) {
        Post[] memory allPosts = new Post[](postIds.length);
        for (uint256 i = 0; i < postIds.length; i++) {
            allPosts[i] = posts[postIds[i]];
        }
        return allPosts;
    }

    function getUser(address _user) external view returns (string memory username, bool[] memory likedPosts) {
        if (!users[_user].registered) {
            revert UserNotRegistered();
        }

        bool[] memory liked = new bool[](postCounter);
        for (uint256 i = 1; i <= postCounter; i++) {
            liked[i - 1] = users[_user].likedPosts[i];
        }

        return (users[_user].username, liked);
    }

    function getAllUsers() external view returns (address[] memory, string[] memory) {
        string[] memory usernames = new string[](userAddresses.length);
        for (uint256 i = 0; i < userAddresses.length; i++) {
            usernames[i] = users[userAddresses[i]].username;
        }
        return (userAddresses, usernames);
    }

    function setUsername(string memory _username) external onlyRegistered {
        if (bytes(_username).length == 0) {
            revert UsernameEmpty();
        }
        users[msg.sender].username = _username;
    }
}
