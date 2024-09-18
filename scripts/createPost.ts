import { ethers } from "hardhat";

const interactions = async () => {
    const socialNetworkAddress = "0xYourDeployedContractAddress"; // Use the actual address
    const SocialNetwork = await ethers.getContractFactory("SocialNetwork");
    const socialNetwork = SocialNetwork.attach(socialNetworkAddress);

    // Create a new post
    await socialNetwork.createPost("Hello, world!", "ipfs://example-image");

    // Get post details
    const post = await socialNetwork.getPost(1);
    console.log(post);

    // Like a post
    await socialNetwork.likePost(1);

    // Get the number of likes on the post
    const likes = await socialNetwork.getLikeCount(1);
    console.log(`Post 1 has ${likes} likes`);

}

interactions()