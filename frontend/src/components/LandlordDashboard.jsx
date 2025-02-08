import { useState } from "react";

const LandlordDashboard = () => {
  const [apartments, setApartments] = useState([
    { id: 1, title: "Luxury Apartment", price: "1.5 ETH" },
    { id: 2, title: "Cozy Studio", price: "0.8 ETH" },
  ]);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold">Landlord Dashboard</h2>
      <div className="mt-4 space-y-4">
        {apartments.map((apt) => (
          <div key={apt.id} className="p-4 border rounded flex justify-between">
            <span>{apt.title} - {apt.price}</span>
            <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandlordDashboard;
