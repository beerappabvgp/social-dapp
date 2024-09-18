// import ethers

import { ethers } from "hardhat";

async function main() {
  // Get the contract factory (a factory is an abstraction to deploy contracts)
  const SocialNetwork = await ethers.getContractFactory("SocialNetwork");

  // Deploy the contract
  console.log("Deploying contract...");
  const socialNetwork = await SocialNetwork.deploy();

  // Wait until the contract is deployed
  await socialNetwork.deployed();

  // Output the address of the deployed contract
  console.log(`SocialNetwork deployed to: ${socialNetwork.address}`);
}

// Error handling
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// 0xfC49116C3D209220bb8217A1A792ACeD8a86cFC0
