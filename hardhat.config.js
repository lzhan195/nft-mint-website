require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    sepolia: {
      url: process.env.REACT_APP_SEPOLIA_RPC_URL,
      accounts:[process.env.REACT_APP_PRIVATE_KEY],
      chainId: 11155111,
    }
  },
  etherscan:{
    apiKey: process.env.REACT_APP_ETHERSCAN_KEY,
  }
};

const REACT_APP_SEPOLIA_RPC_URL = process.env.REACT_APP_SEPOLIA_RPC_URL
const REACT_APP_PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY
const REACT_APP_ETHERSCAN_KEY = process.env.REACT_APP_ETHERSCAN_KEY