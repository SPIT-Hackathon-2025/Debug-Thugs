import React, { useState } from "react";

const SearchApartment = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [apartments, setApartments] = useState([
    { id: 1, name: "Skyline Towers", location: "New York", price: "2 ETH" },
    { id: 2, name: "Sunset Villas", location: "California", price: "1.5 ETH" },
    { id: 3, name: "Palm Residences", location: "Miami", price: "1.2 ETH" },
  ]);

  const filteredApartments = apartments.filter((apartment) =>
    apartment.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Search Apartments</h1>
      <input
        type="text"
        placeholder="Search by name..."
        className="p-3 rounded-lg border w-1/2 mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApartments.map((apartment) => (
          <div key={apartment.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{apartment.name}</h2>
            <p className="text-gray-500">{apartment.location}</p>
            <p className="font-bold mt-2">{apartment.price}</p>
            <button className="btn-primary mt-4">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchApartment;
