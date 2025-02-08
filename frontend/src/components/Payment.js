import React, { useState } from "react";
import { ethers } from "ethers";

const Payment = () => {
  const [amount, setAmount] = useState("");
  const landlordAddress = "0xLandlordWalletAddress";

  const sendPayment = async () => {
    if (!window.ethereum) return alert("MetaMask is required!");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const tx = await signer.sendTransaction({
      to: landlordAddress,
      value: ethers.utils.parseEther(amount),
    });

    alert(`Payment sent! Tx Hash: ${tx.hash}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Send Rent Payment</h1>
      <input
        type="text"
        placeholder="Amount in ETH"
        className="p-3 border rounded-lg mb-4"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={sendPayment} className="btn-primary">Pay Rent</button>
    </div>
  );
};

export default Payment;
