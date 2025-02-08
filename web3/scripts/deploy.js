const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  // List of contract names to deploy (ensure they match your Solidity filenames)
  const contractNames = [
    "ContractEnforcement.sol", 
    "DecentralizedStorage.sol", 
    "DisputeResolution.sol", 
    "Identity.sol", 
    "PaymentDeposit.sol", 
    "RentalAgreement.sol"
  ];

  const deployedContracts = {};

  for (const name of contractNames) {
    console.log(`Deploying ${name}...`);
    const ContractFactory = await ethers.getContractFactory(name);
    const contract = await ContractFactory.deploy(); // Pass constructor arguments if required
    await contract.deployed();
    deployedContracts[name] = contract.address;
    console.log(`${name} deployed at: ${contract.address}`);
  }

  console.log("All contracts deployed successfully:", deployedContracts);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
