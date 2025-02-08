import React from 'react';
import { useState, useEffect } from "react";
import { ethers } from "ethers";

const MetamaskLogin = () => {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if already connected
    checkConnection();
    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  const checkConnection = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
    } else {
      setAccount(null);
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        setLoading(true);
        setError(null);
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
      } catch (error) {
        setError("Failed to connect wallet. Please try again.");
        console.error("Wallet connection failed:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please install MetaMask!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          {error}
        </div>
      )}
      <button
        onClick={connectWallet}
        disabled={loading}
        className={`
          flex items-center space-x-2 
          ${account ? 'bg-green-500' : 'bg-blue-600'} 
          text-white px-6 py-3 rounded-lg
          transform hover:scale-105 transition-all
          shadow-lg hover:shadow-xl
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        <img
          src="/metamask-fox.svg"
          alt="MetaMask"
          className="w-6 h-6"
        />
        <span>
          {loading ? 'Connecting...' : 
           account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : 
           'Connect with MetaMask'}
        </span>
      </button>
    </div>
  );
};

export default MetamaskLogin;
