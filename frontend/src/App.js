import React, { useState } from "react";
import MetamaskLogin from "./components/MetamaskLogin.js";

function App() {
  const [walletAddress, setWalletAddress] = useState("");

  return (
    <div>
      <h1>Rental Marketplace</h1>
      <MetamaskLogin setWalletAddress={setWalletAddress} />
      <p>Connected Wallet: {walletAddress}</p>
    </div>
  );
}

export default App;
