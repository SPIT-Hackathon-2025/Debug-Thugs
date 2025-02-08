import React from "react";
import { ethers } from "ethers";

const MetamaskLogin = ({ setWalletAddress }) => {
  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setWalletAddress(await signer.getAddress());
    } else {
      alert("Please install MetaMask");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Connect Your Wallet</h1>
      <button onClick={connectWallet} className="btn-primary">Connect MetaMask</button>
    </div>
  );
};

export default MetamaskLogin;
