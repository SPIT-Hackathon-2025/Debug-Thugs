import { useState } from "react";

const SearchApartment = () => {
  const [query, setQuery] = useState("");
  const apartments = [
    { id: 1, title: "Luxury Apartment", price: "1.5 ETH" },
    { id: 2, title: "Cozy Studio", price: "0.8 ETH" },
  ];

  return (
    <div className="max-w-lg mx-auto mt-10">
      <input className="border p-2 rounded w-full" type="text" placeholder="Search Apartment" onChange={(e) => setQuery(e.target.value)} />
      <div className="mt-4 space-y-2">
        {apartments
          .filter((apt) => apt.title.toLowerCase().includes(query.toLowerCase()))
          .map((apt) => (
            <div key={apt.id} className="p-3 border rounded">{apt.title} - {apt.price}</div>
          ))}
      </div>
    </div>
  );
};

export default SearchApartment;
