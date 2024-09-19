import { ethers } from "ethers";

export const connectWallet = async () => {
  if (!window.ethereum) throw new Error("No crypto wallet found");

  // Request user accounts from MetaMask or another injected provider
  await window.ethereum.request({ method: "eth_requestAccounts" });

  // Return a new BrowserProvider instance to interact with Ethereum
  return new ethers.BrowserProvider(window.ethereum);
};
