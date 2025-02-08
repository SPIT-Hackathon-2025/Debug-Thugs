// filepath: /d:/hack/Debug-Thugs/frontend/src/components/MetamaskLogin.js
import React, { useState } from "react";
import { ethers } from "ethers";

const MetamaskLogin = ({ setWalletAddress, setUserType }) => {
  const connectWallet = async (userType) => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setWalletAddress(await signer.getAddress());
      setUserType(userType);
    } else {
      alert("Please install MetaMask");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Login to Tor-Rent</h1>
      <div className="space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => connectWallet("landlord")}
        >
          Login as Landlord
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => connectWallet("tenant")}
        >
          Login as Tenant
        </button>
      </div>
    </div>
  );
};

export default MetamaskLogin;