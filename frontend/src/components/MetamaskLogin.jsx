import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from "ethers";

const MetamaskLogin = () => {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showRoleSelect, setShowRoleSelect] = useState(true);
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check session storage for existing login
    const savedAccount = sessionStorage.getItem('account');
    const savedRole = sessionStorage.getItem('userRole');
    
    if (savedAccount && savedRole) {
      setAccount(savedAccount);
      navigateToRole(savedRole);
    }

    // Listen for tab/window close
    window.addEventListener('beforeunload', handleTabClose);
    
    // Listen for MetaMask account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  const handleTabClose = () => {
    sessionStorage.removeItem('account');
    sessionStorage.removeItem('userRole');
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      // User disconnected wallet
      handleLogout();
    } else if (accounts[0] !== account) {
      // Account changed, require re-login
      handleLogout();
    }
  };

  const handleLogout = () => {
    setAccount(null);
    setSelectedRole(null);
    setShowRoleSelect(true);
    sessionStorage.removeItem('account');
    sessionStorage.removeItem('userRole');
    navigate('/');
  };

  const connectWallet = async (role) => {
    if (!window.ethereum) {
      setError("Please install MetaMask!");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
      
      // Store user role and address in session storage
      sessionStorage.setItem('account', accounts[0]);
      sessionStorage.setItem('userRole', role);
      
      // Navigate to appropriate dashboard
      navigateToRole(role);
    } catch (error) {
      setError("Failed to connect wallet. Please try again.");
      console.error("Wallet connection failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const navigateToRole = (role) => {
    if (role === 'landlord') {
      navigate('/landlord-dashboard');
    } else {
      navigate('/tenant-dashboard');
    }
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    connectWallet(role);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          {error}
        </div>
      )}
      
      {!account && showRoleSelect && (
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-semibold text-center dark:text-white">Select Your Role</h3>
          <div className="flex space-x-4">
            <button
              onClick={() => handleRoleSelect('landlord')}
              disabled={loading}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && selectedRole === 'landlord' ? 'Connecting...' : 'Landlord'}
            </button>
            <button
              onClick={() => handleRoleSelect('tenant')}
              disabled={loading}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && selectedRole === 'tenant' ? 'Connecting...' : 'Tenant'}
            </button>
          </div>
        </div>
      )}

      {account && (
        <div className="flex items-center space-x-4">
          <span className="text-green-500 dark:text-green-400 font-semibold">
            {account.slice(0, 6)}...{account.slice(-4)}
          </span>
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-600 font-medium"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default MetamaskLogin;
