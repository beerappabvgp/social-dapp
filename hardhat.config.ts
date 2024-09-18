// import { HardhatUserConfig } from "hardhat/config";
// import "@nomicfoundation/hardhat-toolbox";

// const config: HardhatUserConfig = {
//   solidity: "0.8.24",
// };

// export default config;


import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";  // If you plan to verify contracts later

const SEPOLIA_RPC_URL = "https://eth-sepolia.g.alchemy.com/v2/ci8P-C2SEGZQQBc3yu7hQ7_vvV-HuTpX"; // Add your Infura/Alchemy API key here
const PRIVATE_KEY = "e68a07ed140e16c06332a5a5b80fb5b9731ca8afb9e1f059eeddff80093ef32c"; // Your wallet private key (ensure it has Sepolia ETH)

const config: HardhatUserConfig = {
  solidity: "0.8.24",  // Ensure Solidity version matches the contract
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111, // Chain ID for Sepolia
    },
  },
};

export default config;
