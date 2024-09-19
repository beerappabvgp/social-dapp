import { ethers } from "hardhat";

async function main() {
  
  const SocialNetwork = await ethers.getContractFactory("SocialNetwork");

  
  console.log("Deploying contract...");
  const socialNetwork = await SocialNetwork.deploy();

  
  await socialNetwork.deployed();

  
  console.log(`SocialNetwork deployed to: ${socialNetwork.address}`);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// 0xfC49116C3D209220bb8217A1A792ACeD8a86cFC0
