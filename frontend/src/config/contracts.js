import ContractEnforcementABI from '../contracts/ContractEnforcement.json';
import PaymentDepositABI from '../contracts/PaymentDeposit.json';
// Import other contract ABIs as needed

export const CONTRACT_ADDRESSES = {
  RentalAgreement: "0xB0aaac7908C9C54421C384C1a4a8d923ae8e0F23",
  PaymentDeposit: "0xe75FC2e06CD487d4A9f80b52609Ed889589bB670",
  IdentityVerification: "0xb07BBf349ad324fd18556fEa64362628E752b43d",
  DisputeResolution: "0x6801AA5970ab61A12Aa577513709Bb99A334eC81",
  DecentralizedStorage: "0xB18A9c92C626a95EFb312fFc9612608B94D0EdF7",
  ContractEnforcement: "0x0Bf8E4990c9F5ea14D4C192C6a31cE734fd692Db"
};

export const CONTRACT_ABIS = {
  ContractEnforcement: ContractEnforcementABI,
  PaymentDeposit: PaymentDepositABI
};

// List of contract addresses to monitor for transactions
export const MONITORED_ADDRESSES = Object.values(CONTRACT_ADDRESSES); 