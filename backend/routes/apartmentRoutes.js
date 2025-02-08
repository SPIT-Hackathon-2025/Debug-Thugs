const express = require("express");
const ethers = require("ethers");
require("dotenv").config();
const router = express.Router();

const contractABI = require("../web3/abi/ContractEnforcement.json").abi;
const contractAddress = "0x0Bf8E4990c9F5ea14D4C192C6a31cE734fd692Db";

router.get("/getRent", async (req, res) => {
  const provider = new ethers.providers.JsonRpcProvider("https://rpc-amoy.polygon.technology");
  const contract = new ethers.Contract(contractAddress, contractABI, provider);
  const rent = await contract.getRent();
  res.json({ rent: ethers.utils.formatEther(rent) });
});

module.exports = router;