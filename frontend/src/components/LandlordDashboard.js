import React from "react";
import { Link } from "react-router-dom";

const LandlordDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="container-box">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Landlord Dashboard</h1>
        <p className="text-gray-600 mb-6">Manage properties, tenants, and payments.</p>
        <div className="space-x-4">
          <Link to="/add-apartment" className="btn-primary">Add Apartment</Link>
          <Link to="/payment" className="btn-secondary">Payments</Link>
        </div>
      </div>
    </div>
  );
};

export default LandlordDashboard;
