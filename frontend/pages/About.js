import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white p-6">
      <div className="max-w-4xl bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-center">About Our Rental Platform</h1>
        <p className="text-lg text-gray-200 text-center">
          Welcome to our decentralized rental marketplace! We leverage blockchain technology to provide secure and
          transparent transactions between landlords and tenants.
        </p>
        <p className="mt-4 text-lg text-gray-200 text-center">
          Our platform ensures trust, security, and ease of use with Web3 authentication and smart contracts for
          seamless transactions.
        </p>
      </div>
    </div>
  );
};

export default About;
