import { ethers } from 'ethers';
import * as abi from "../../../../artifacts/contracts/SocialNetwork.sol/SocialNetwork.json"




export const getContract = (provider: any) => {
  const contractAddress = '0xDbD80dAA55BE8708D01df7dC871DF34F3B9c4c11';
  const signer = provider.getSigner();
  return new ethers.Contract(contractAddress, abi.abi, signer);
};

