import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import RentalAgreementABI from "../web3/abi/RentalAgreement.json";

const CONTRACT_ADDRESS = "0xYourSmartContractAddress";

const ContractInteraction = () => {
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [rentAmount, setRentAmount] = useState("");

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        setSigner(signer);

        const contract = new ethers.Contract(CONTRACT_ADDRESS, RentalAgreementABI, signer);
        setContract(contract);
      } else {
        alert("Please install MetaMask.");
      }
    };

    loadBlockchainData();
  }, []);

  const getRentAmount = async () => {
    const rent = await contract.getRentAmount();
    setRentAmount(ethers.utils.formatEther(rent) + " ETH");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Smart Contract Interaction</h1>
      <button onClick={getRentAmount} className="btn-primary">Get Rent Amount</button>
      {rentAmount && <p className="text-xl mt-4">Rent: {rentAmount}</p>}
    </div>
  );
};

export default ContractInteraction;
