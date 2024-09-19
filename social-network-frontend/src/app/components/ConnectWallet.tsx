import { useState, useEffect } from 'react';
import { connectWallet } from '../utils/wallet';

const ConnectWallet = ({ setProvider } : any) => {
  const [address, setAddress] = useState<string | null>(null);

  // Function to connect the wallet
  const handleConnect = async () => {
    try {
      const provider = await connectWallet();
      const signer = provider.getSigner();
      const walletAddress = await signer.getAddress();
      setAddress(walletAddress);
      setProvider(provider);
      
      // Save the wallet address to localStorage
      localStorage.setItem('walletAddress', walletAddress);
    } catch (err) {
      console.error(err);
    }
  };

  // On component mount, check if a wallet address is stored in localStorage
  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress) {
      setAddress(savedAddress);
    }
  }, []);

  return (
    <div className="flex items-center space-x-4">
      {address ? (
        <span>{address.slice(0, 6)}...{address.slice(-4)}</span>
      ) : (
        <button className="btn-primary border-2 border-cyan-500 p-4 shadow-lg shadow-purple rounded-2xl" onClick={handleConnect}>
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;
