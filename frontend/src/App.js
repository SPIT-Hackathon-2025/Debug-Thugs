import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LandlordDashboard from "./components/LandlordDashboard";
import TenantDashboard from "./components/TenantDashboard";
import AddApartment from "./components/AddApartment";
import SearchApartment from "./components/SearchApartment";
import Payment from "./components/Payment";
import ContractInteraction from "./components/ContractInteraction";
import MetamaskLogin from "./components/MetamaskLogin";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/landlord" element={<LandlordDashboard />} />
        <Route path="/tenant" element={<TenantDashboard />} />
        <Route path="/add-apartment" element={<AddApartment />} />
        <Route path="/search-apartment" element={<SearchApartment />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/contract" element={<ContractInteraction />} />
        <Route path="/login" element={<MetamaskLogin />} />
      </Routes>
    </Router>
  );
};

export default App;
