import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESSES, CONTRACT_ABIS, MONITORED_ADDRESSES } from '../config/contracts';

const LandlordDashboard = () => {
  const [activeTab, setActiveTab] = useState('apartments');
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [account, setAccount] = useState(null);

  // Mock data for demonstration
  const apartments = [
    { id: 1, title: "Luxury Apartment", rent: "0.1", location: "New York", available: true },
    { id: 2, title: "Cozy Studio", rent: "0.05", location: "Los Angeles", available: false },
  ];

  const tenants = [
    { address: "0x1234...5678", apartment: "Luxury Apartment", status: "Active" },
    { address: "0x8765...4321", apartment: "Cozy Studio", status: "Late Payment" },
  ];

  useEffect(() => {
    const fetchAccount = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      }
    };
    fetchAccount();
  }, []);

  useEffect(() => {
    if (account && activeTab === 'transactions') {
      fetchTransactions();
    }
  }, [account, activeTab]);

  const fetchTransactions = async () => {
    if (!window.ethereum) {
      console.error('MetaMask is not installed');
      return;
    }

    try {
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      const latestBlock = await provider.getBlockNumber();
      const startBlock = latestBlock - 10000; // Last 10000 blocks

      // Get all transactions for the account
      const [sentTx, receivedTx] = await Promise.all([
        // Get sent transactions
        provider.send('eth_getTransactionsByAddress', [
          account,
          '0x' + startBlock.toString(16),
          '0x' + latestBlock.toString(16)
        ]),
        // Get received transactions
        provider.send('eth_getTransactionsByAddress', [
          account,
          '0x' + startBlock.toString(16),
          '0x' + latestBlock.toString(16),
          true
        ])
      ]);

      const allTransactions = [...(sentTx || []), ...(receivedTx || [])];
      
      // Filter transactions involving our contracts
      const contractTransactions = allTransactions.filter(tx => 
        MONITORED_ADDRESSES.includes(tx.to?.toLowerCase()) || 
        MONITORED_ADDRESSES.includes(tx.from?.toLowerCase())
      );

      if (contractTransactions.length > 0) {
        const formattedTransactions = await Promise.all(
          contractTransactions.map(async (tx) => {
            const receipt = await provider.getTransactionReceipt(tx.hash);
            const block = await provider.getBlock(tx.blockNumber);

            // Determine contract name
            let contractName = 'Unknown Contract';
            for (const [name, address] of Object.entries(CONTRACT_ADDRESSES)) {
              if (tx.to?.toLowerCase() === address.toLowerCase()) {
                contractName = name;
                break;
              }
            }

            return {
              hash: tx.hash,
              from: tx.from,
              to: tx.to,
              value: ethers.utils.formatEther(tx.value || '0'),
              status: receipt?.status === 1 ? 'Success' : 'Failed',
              timestamp: new Date(block.timestamp * 1000),
              contractName,
              gasUsed: receipt?.gasUsed?.toString() || '0'
            };
          })
        );

        // Sort transactions by timestamp (newest first)
        formattedTransactions.sort((a, b) => b.timestamp - a.timestamp);
        setTransactions(formattedTransactions);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const enforceContract = async (tenantAddress) => {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESSES.ContractEnforcement,
        CONTRACT_ABIS.ContractEnforcement,
        signer
      );
      
      const tx = await contract.reportViolation(
        tenantAddress,
        "Rent payment overdue",
        ethers.utils.parseEther("0.1")
      );
      await tx.wait();
      alert("Contract enforcement initiated successfully!");
      fetchTransactions();
    } catch (error) {
      console.error('Error enforcing contract:', error);
      alert("Failed to enforce contract. See console for details.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Landlord Dashboard</h1>
      
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('apartments')}
          className={`px-4 py-2 rounded ${activeTab === 'apartments' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          My Apartments
        </button>
        <button
          onClick={() => setActiveTab('tenants')}
          className={`px-4 py-2 rounded ${activeTab === 'tenants' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Tenants
        </button>
        <button
          onClick={() => setActiveTab('transactions')}
          className={`px-4 py-2 rounded ${activeTab === 'transactions' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Transactions
        </button>
      </div>

      {activeTab === 'apartments' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apartments.map((apt) => (
            <div key={apt.id} className="border rounded-lg p-4 shadow">
              <h3 className="text-xl font-semibold">{apt.title}</h3>
              <p className="text-blue-500 font-semibold">{apt.rent} ETH/month</p>
              <p className="text-gray-500">{apt.location}</p>
              <p className={`${apt.available ? 'text-green-500' : 'text-red-500'}`}>
                {apt.available ? 'Available' : 'Occupied'}
              </p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'tenants' && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b">Address</th>
                <th className="px-6 py-3 border-b">Apartment</th>
                <th className="px-6 py-3 border-b">Status</th>
                <th className="px-6 py-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((tenant, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 border-b">{tenant.address}</td>
                  <td className="px-6 py-4 border-b">{tenant.apartment}</td>
                  <td className="px-6 py-4 border-b">{tenant.status}</td>
                  <td className="px-6 py-4 border-b">
                    <button
                      onClick={() => enforceContract(tenant.address)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Enforce Contract
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'transactions' && (
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-4">Loading transactions...</div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-4">No transactions found</div>
          ) : (
            transactions.map((tx, index) => (
              <div key={index} className="border rounded p-4 hover:shadow-md transition-shadow dark:bg-gray-800">
                <div className="grid grid-cols-2 gap-2">
                  <p><span className="font-semibold">Contract:</span> {tx.contractName}</p>
                  <p><span className="font-semibold">Hash:</span> 
                    <a 
                      href={`https://mumbai.polygonscan.com/tx/${tx.hash}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600"
                    >
                      {tx.hash.slice(0, 6)}...{tx.hash.slice(-4)}
                    </a>
                  </p>
                  <p><span className="font-semibold">Amount:</span> {tx.value} MATIC</p>
                  <p><span className="font-semibold">Gas Used:</span> {tx.gasUsed}</p>
                  <p><span className="font-semibold">From:</span> {tx.from.slice(0, 6)}...{tx.from.slice(-4)}</p>
                  <p><span className="font-semibold">To:</span> {tx.to.slice(0, 6)}...{tx.to.slice(-4)}</p>
                  <p><span className="font-semibold">Status:</span> 
                    <span className={tx.status === 'Success' ? 'text-green-500' : 'text-red-500'}>
                      {tx.status}
                    </span>
                  </p>
                  <p><span className="font-semibold">Date:</span> {tx.timestamp.toLocaleString()}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default LandlordDashboard;
