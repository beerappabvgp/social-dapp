import { ethers } from 'ethers';

export const connectWallet = async () => {
  if (!(window as any).ethereum) throw new Error("No crypto wallet found");
  await (window as any).ethereum.request({ method: "eth_requestAccounts" });
  return new (ethers as any).providers.Web3Provider((window as any).ethereum);
};
