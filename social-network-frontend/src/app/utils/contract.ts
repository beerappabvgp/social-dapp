import { ethers } from 'ethers';
import * as abi from "../../../SocialNetwork.json"




export const getContract = (provider: any) => {
  // const contractAddress = '0xDbD80dAA55BE8708D01df7dC871DF34F3B9c4c11';
  const contractAddress = '0xbDDA79694dF420b2a6D46ae611c8aF1F6eB014eb';
  const signer = provider.getSigner();
  return new ethers.Contract(contractAddress, abi.abi, signer);
};

