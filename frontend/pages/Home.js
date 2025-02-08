import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <h1 className="text-5xl font-bold mb-4">Welcome to Rental App</h1>
      <p className="text-lg mb-6">Find & Manage Apartments with Blockchain Security</p>
      <div className="space-x-4">
        <Link to="/tenant" className="btn-primary">Tenant Dashboard</Link>
        <Link to="/landlord" className="btn-secondary">Landlord Dashboard</Link>
      </div>
    </div>
  );
};

export default Home;
