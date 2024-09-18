"use client"

import { useState } from 'react';
import { ethers } from 'ethers';

interface Props {
  contractAddress: string;
  abi: any;
}

export default function ContractInteraction({ contractAddress, abi }: Props) {
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      try { 
        const tx = await contract.setMessage(message);
        await tx.wait();
        alert('Transaction successful!');
      } catch (error) {
        console.error('Error sending transaction:', error);
        alert('Transaction failed!');
      }
    }
  };

  return (
    <div className="p-6 bg-secondary rounded-lg">
      <h3 className="text-white text-xl mb-4">Interact with Smart Contract</h3>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="p-2 rounded-lg bg-gray-800 text-white w-full"
        placeholder="Enter message"
      />
      <button onClick={sendMessage} className="mt-4 px-6 py-2 bg-primary text-white rounded-full">
        Send Transaction
      </button>
    </div>
  );
}
