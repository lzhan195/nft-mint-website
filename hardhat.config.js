require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.9",
    defaultNetwork: "hardhat",
    networks: {
        hardhat: { allowUnlimitedContractSize: true },
        sepolia: {
            url: process.env.REACT_APP_SEPOLIA_RPC_URL,
            accounts: [process.env.REACT_APP_PRIVATE_KEY],
            chainId: 11155111,
            allowUnlimitedContractSize: true,
        },
    },
    etherscan: {
        apiKey: process.env.REACT_APP_ETHERSCAN_KEY,
    },
}
