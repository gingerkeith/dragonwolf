import { ethers } from "ethers";

const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_API_KEY;
const provider = new ethers.providers.JsonRpcProvider(`https://polygon-amoy.infura.io/v3/${INFURA_ID}`);
// const provider = new ethers.providers.InfuraProvider("maticmum");
const contractAddress = "0xC6760c2Fd1809742B4577aAaa4013C92e9Cd89bB";
const CONTRACT_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function balanceOf(address) view returns (uint)",
  "function trade(giveTokenId[], receiveTokenId[], amount[])",
  "function forge(burnIds[], burnamount, _forgeId)",
  "function mint(to, tokenId, quantity)",
  "function setApprovalForAll(operator, approved)",
  "function burnBatch(account, ids[], values[])",
  "function tokenURI(_tokenId) pure returns (string)",
];
const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, provider);

export const main = async () => {
  const name = await contract.name();
  const symbol = await contract.symbol();
  const totalSupply = await contract.totalSupply();

  console.log(`\nReading from ${contractAddress}\n`);
  console.log(`Name: ${name}`);
  console.log(`Symbol: ${symbol}`);
  console.log(`Total Supply: ${totalSupply}\n`);

  const balance = await contract.balanceOf("msg.sender");

  console.log(`Balance Returned: ${balance}`);
  alert(`Balance Returned: ${balance}`);
  console.log(`Balance Formatted: ${ethers.utils.formatEther(balance)}\n`);
};

main();

// await provider.send("eth_requestAccounts", []);
// const signer = provider.getSigner();
