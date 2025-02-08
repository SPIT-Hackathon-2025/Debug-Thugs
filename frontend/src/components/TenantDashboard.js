import React from "react";
import { Link } from "react-router-dom";

const TenantDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="container-box">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Tenant Dashboard</h1>
        <p className="text-gray-600 mb-6">Find apartments, view contracts, and pay rent.</p>
        <div className="space-x-4">
          <Link to="/search-apartment" className="btn-primary">Search Apartments</Link>
          <Link to="/contract" className="btn-secondary">View Contract</Link>
        </div>
      </div>
    </div>
  );
};

export default TenantDashboard;
