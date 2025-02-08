const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
<<<<<<< HEAD
  console.log("Deploying contracts with the account: ${deployer.address}");

  // List of contract names to deploy (ensure they match your Solidity filenames)
  const contractNames = [
    "RenatalAgreement", 
    "DisputeResolution", 
    "ContractEnforcement", 
    "DecentralizedStorage", 
    "IdentityVerification", 
    "PaymentDeposit"
=======
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  // List of contract names to deploy (ensure they match your Solidity filenames)
  const contractNames = [
    "ContractEnforcement.sol", 
    "DecentralizedStorage.sol", 
    "DisputeResolution.sol", 
    "Identity.sol", 
    "PaymentDeposit.sol", 
    "RentalAgreement.sol"
>>>>>>> f92de302e4a6008485a625caec2416bae88d6a81
  ];

  const deployedContracts = {};

  for (const name of contractNames) {
<<<<<<< HEAD
    console.log("Deploying ${name}...");
=======
    console.log(`Deploying ${name}...`);
>>>>>>> f92de302e4a6008485a625caec2416bae88d6a81
    const ContractFactory = await ethers.getContractFactory(name);
    const contract = await ContractFactory.deploy(); // Pass constructor arguments if required
    await contract.deployed();
    deployedContracts[name] = contract.address;
<<<<<<< HEAD
=======
    console.log(`${name} deployed at: ${contract.address}`);
>>>>>>> f92de302e4a6008485a625caec2416bae88d6a81
  }

  console.log("All contracts deployed successfully:", deployedContracts);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
<<<<<<< HEAD
  });
=======
  });
>>>>>>> f92de302e4a6008485a625caec2416bae88d6a81
