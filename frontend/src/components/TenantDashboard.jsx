import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from '../config/contracts';

const TenantDashboard = () => {
  const [apartments, setApartments] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState('available');
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState(null);

  const contractAddress = CONTRACT_ADDRESSES.PaymentDeposit;

  useEffect(() => {
    fetchApartments();
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

  const fetchApartments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/apartments');
      const data = await response.json();
      setApartments(data);
    } catch (error) {
      console.error('Error fetching apartments:', error);
    }
  };

  const fetchTransactions = async () => {
    if (!window.ethereum) {
      console.error('MetaMask is not installed');
      return;
    }

    try {
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      const latestBlock = await provider.getBlockNumber();
      const startBlock = latestBlock - 10000;

      const history = await Promise.all([
        provider.send('eth_getTransactionsByAddress', [
          account,
          '0x' + startBlock.toString(16),
          '0x' + latestBlock.toString(16)
        ]),
        provider.send('eth_getTransactionsByAddress', [
          account,
          '0x' + startBlock.toString(16),
          '0x' + latestBlock.toString(16),
          true
        ])
      ]);

      const allTransactions = [...(history[0] || []), ...(history[1] || [])];
      
      if (allTransactions.length > 0) {
        const formattedTransactions = await Promise.all(
          allTransactions.map(async (tx) => {
            const receipt = await provider.getTransactionReceipt(tx.hash);
            const block = await provider.getBlock(tx.blockNumber);
            return {
              hash: tx.hash,
              from: tx.from,
              to: tx.to,
              value: ethers.utils.formatEther(tx.value || '0'),
              status: receipt?.status === 1 ? 'Success' : 'Failed',
              timestamp: new Date(block.timestamp * 1000)
            };
          })
        );
        setTransactions(formattedTransactions);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRentPayment = async (apartment) => {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    try {
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESSES.PaymentDeposit,
        CONTRACT_ABIS.PaymentDeposit,
        signer
      );
      
      const tx = await contract.payRent({
        value: ethers.utils.parseEther(apartment.rent.toString())
      });
      await tx.wait();
      alert('Payment successful!');
      fetchTransactions();
    } catch (error) {
      console.error('Error processing payment:', error);
      alert("Payment failed. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async (apartmentId, review) => {
    try {
      await fetch(`http://localhost:5000/api/apartments/${apartmentId}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ review }),
      });
      fetchApartments();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('available')}
          className={`px-4 py-2 rounded ${activeTab === 'available' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Available Apartments
        </button>
        <button
          onClick={() => setActiveTab('transactions')}
          className={`px-4 py-2 rounded ${activeTab === 'transactions' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          My Transactions
        </button>
      </div>

      {activeTab === 'available' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apartments.filter(apt => apt.available).map((apt) => (
            <div key={apt._id} className="border rounded-lg p-4 shadow">
              <img src={apt.image} alt={apt.title} className="w-full h-48 object-cover rounded mb-4" />
              <h3 className="text-xl font-semibold">{apt.title}</h3>
              <p className="text-gray-600">{apt.description}</p>
              <p className="text-blue-500 font-semibold">{apt.rent} ETH/month</p>
              <p className="text-gray-500">{apt.location}</p>
              
              <div className="mt-4">
                <button
                  onClick={() => handleRentPayment(apt)}
                  disabled={loading}
                  className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Rent Now'}
                </button>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold mb-2">Reviews</h4>
                {apt.reviews?.map((review, index) => (
                  <div key={index} className="text-sm text-gray-600 mb-2">
                    {review}
                  </div>
                ))}
                <textarea
                  className="w-full border rounded p-2 mt-2"
                  placeholder="Write a review..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      submitReview(apt._id, e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
              </div>
            </div>
          ))}
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
              <div key={index} className="border rounded p-4 hover:shadow-md transition-shadow">
                <div className="grid grid-cols-2 gap-2">
                  <p><span className="font-semibold">Hash:</span> {tx.hash}</p>
                  <p><span className="font-semibold">Amount:</span> {tx.value} ETH</p>
                  <p><span className="font-semibold">From:</span> {tx.from}</p>
                  <p><span className="font-semibold">To:</span> {tx.to}</p>
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

export default TenantDashboard;
