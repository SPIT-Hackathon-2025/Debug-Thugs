import React, { useState } from "react";

const AddApartment = () => {
  const [apartment, setApartment] = useState({
    name: "",
    location: "",
    price: "",
  });

  const handleChange = (e) => {
    setApartment({ ...apartment, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Apartment "${apartment.name}" added successfully!`);
    setApartment({ name: "", location: "", price: "" });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Apartment</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-1/2">
        <input
          type="text"
          name="name"
          placeholder="Apartment Name"
          className="w-full p-3 border rounded-lg mb-4"
          value={apartment.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="w-full p-3 border rounded-lg mb-4"
          value={apartment.location}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="price"
          placeholder="Price in ETH"
          className="w-full p-3 border rounded-lg mb-4"
          value={apartment.price}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn-primary w-full">Add Apartment</button>
      </form>
    </div>
  );
};

export default AddApartment;
