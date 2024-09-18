import { ethers } from 'ethers';

export const connectWallet = async () => {
  if (!window.ethereum) throw new Error("No crypto wallet found");
  await window.ethereum.request({ method: "eth_requestAccounts" });
  return new ethers.providers.Web3Provider(window.ethereum);
};
