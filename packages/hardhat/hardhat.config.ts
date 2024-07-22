import * as dotenv from "dotenv";
dotenv.config();
// import "@nomicfoundation/hardhat-toolbox";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-verify";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-chai-matchers";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@nomicfoundation/hardhat-verify";
import "hardhat-deploy";
import "hardhat-deploy-ethers";

const privateKey = process.env.PRIVATE_KEY || "";
const alchemyApiKey = process.env.ALCHEMY_API_KEY || "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF"; //default, publicly known key from Scaffold-eth
const polygonScanApiKey = process.env.POLYGONSCAN_API_KEY || "";
const etherscanApiKey = process.env.ETHERSCAN_API_KEY || "";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  sourcify: {
    enabled: false,
  },
  defaultNetwork: "polygonAmoy",
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  networks: {
    polygonAmoy: {
      url: `https://polygon-amoy.g.alchemy.com/v2/${alchemyApiKey}`,
      // url: `https://polygon-amoy.drpc.org`,
      // url: `https://polygon-amoy.blockpi.network/v1/rpc/public`,
      // url: `https://rpc.ankr.com/polygon_amoy`,
      // url: `https://polygon-amoy-bor-rpc.publicnode.com`,
      // url: `https://rpc-amoy.polygon.technology`,
      accounts: [privateKey],
      // accounts: [${process.env.PRIVATE_KEY}],
      // accounts: [alchemyApiKey], //account: [${process.env.privateKey}]
      // accounts: [polygonScanApiKey as string],
      gasPrice: "auto",
    },
    polygon: {
      url: `https://polygon-amoy.g.alchemy.com/v2/${alchemyApiKey}`,
      // url: `https://polygon-mainnet.g.alchemy.com/v2/${alchemyApiKey}`,
      accounts: [privateKey],
      gasPrice: "auto",
    },
    hardhat: {
      forking: {
        url: `https://polygon-amoy.g.alchemy.com/v2/${alchemyApiKey}`,
        // accounts: [privateKey],
      },
    },
  },
  etherscan: {
    apiKey: etherscanApiKey,
    // apiKey: polygonScanApiKey,
    // polygonAmoy: polygonScanApiKey,
  },
};
export default config;
