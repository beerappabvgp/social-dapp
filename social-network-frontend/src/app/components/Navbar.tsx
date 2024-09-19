"use client";

import { useState } from 'react';
import ConnectWallet from './ConnectWallet';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ provider , setProvider }: any) => {
  const { isLoggedIn } = useAuth();

  return (
    <nav className="p-4 bg-secondary shadow-lg flex justify-between items-center">
      <Link className="text-xl font-bold" href="/">Social Network DApp</Link>
      {
        isLoggedIn ? (
          <div className="flex space-x-4">
            <Link href="/create" className="text-white border-2 border-cyan-500 p-4 shadow-lg shadow-purple rounded-2xl">Create Post</Link>
            <ConnectWallet provider = {provider} setProvider={setProvider} />
          </div>
        ) : (
          <div className='flex space-x-4'>
            <Link href="/signup" className="text-white border-2 border-cyan-500 p-4 shadow-lg shadow-purple rounded-2xl">Sign Up</Link>
            <Link href="/signin" className="text-white border-2 border-cyan-500 p-4 shadow-lg shadow-purple rounded-2xl">Sign In</Link>
          </div>
        )
      }
    </nav>
  );
};

export default Navbar;
