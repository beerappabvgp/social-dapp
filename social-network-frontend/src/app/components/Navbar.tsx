import { useEffect } from 'react';
import Link from 'next/link';
import ConnectWallet from './ConnectWallet';
import { useAuth } from '../context/AuthContext';
import { ethers } from 'ethers';

const Navbar = ({ setProvider }: any) => {
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const checkWalletConnection = async () => {
      const savedAddress = localStorage.getItem('walletAddress');
      if (savedAddress && (window as any).ethereum) {
        try {
          const provider = new (ethers as any).providers.Web3Provider((window as any).ethereum);
          setProvider(provider);
        } catch (err) {
          console.error('Failed to reconnect wallet:', err);
        }
      }
    };

    checkWalletConnection();
  }, [setProvider]);

  return (
    <nav className="p-4 bg-secondary shadow-lg flex justify-between items-center">
      <Link className="text-xl font-bold" href="/">Social Network DApp</Link>
      {
        isLoggedIn ? (
          <div className="flex space-x-4">
            <Link href="/create" className="text-white border-2 border-cyan-500 p-4 shadow-lg shadow-purple rounded-2xl">Create Post</Link>
            <ConnectWallet setProvider={setProvider} />
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link href="/signup" className="text-white border-2 border-cyan-500 p-4 shadow-lg shadow-purple rounded-2xl">Sign Up</Link>
            <Link href="/signin" className="text-white border-2 border-cyan-500 p-4 shadow-lg shadow-purple rounded-2xl">Sign In</Link>
          </div>
        )
      }
    </nav>
  );
};

export default Navbar;
