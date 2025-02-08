import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <h1 className="text-5xl font-bold mb-4">Welcome to Tor-Rent</h1>
      <p className="text-lg mb-6">Find & Manage Apartments with Blockchain Security</p>
      <div className="space-x-4">
        <Link to="/login" className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
          Login as Tenant
        </Link>
        <Link to="/login" className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded">
          Login as Landlord
        </Link>
      </div>
    </div>
  );
};

export default Home;