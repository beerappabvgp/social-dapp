import { ethers } from 'ethers';
import * as abi from "../../../../artifacts/contracts/SocialNetwork.sol/SocialNetwork.json";

// Function to get contract instance
export const getContract = async (provider: any, isSignerRequired = false) => {
  const contractAddress = '0xbDDA79694dF420b2a6D46ae611c8aF1F6eB014eb';
  
  // Use the provider for read-only methods and signer for write methods
  const runner = isSignerRequired ? await provider.getSigner() : provider;
  console.log(runner);
  console.log(isSignerRequired);
  return new ethers.Contract(contractAddress, abi.abi, runner);
};
