import React, { useState } from "react";
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

  return <button onClick={connectWallet}>Connect MetaMask</button>;
};

export default MetamaskLogin;
