"use client";

import Link from "next/link";
import { AlchemyProvider } from "@ethersproject/providers";
// import * as dotenv from "dotenv";
import { ContractInterface, ContractMethod, ethers } from "ethers";

// dotenv.config();

// import { main } from "~~/utils/myContractData.ts";

//packages\nextjs\utils\myContractData.ts
const ALCHEMY_ID = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
// const provider = new ethers.providers.AlchemyProvider("maticmum", `https://polygon-amoy.ALCHEMY.io/v3/${ALCHEMY_ID}`);
const provider = new ethers.providers.AlchemyProvider("maticmum", `https://polygon-amoy.ALCHEMY.io/v3/${ALCHEMY_ID}`);
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

// interface MyContract extends ethers.Contract {
//   name: ContractMethod<[], string>;
//   symbol: ContractMethod<[], string>;
//   balanceOf: ContractMethod<[string], number>;
//   trade: ContractMethod<[number[], number[], number[]], void>;
//   forge: ContractMethod<[number[], number, number], void>;
//   mint: ContractMethod<[string, number, number], void>;
//   setApprovalForAll: ContractMethod<[string, boolean], void>;
//   burnBatch: ContractMethod<[string, number[], number[]], void>;
//   tokenURI: ContractMethod<[number], string>;
// }

// interface MyContract extends ethers.Contract {
//   name(): Promise<string>;
//   symbol(): Promise<string>;
//   balanceOf(address: string): Promise<number>;
//   trade(giveTokenId: number[], receiveTokenId: number[], amount: number[]): Promise<void>;
//   forge(burnIds: number[], burnamount: number, _forgeId: number): Promise<void>;
//   mint(to: string, tokenId: number, quantity: number): Promise<void>;
//   setApprovalForAll(operator: string, approved: boolean): Promise<void>;
//   burnBatch(account: string, ids: number[], values: number[]): Promise<void>;
//   tokenURI(_tokenId: number): Promise<string>;
// }

// const contract: MyContract = new ethers.Contract(contractAddress, CONTRACT_ABI, provider) as MyContract;
const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, provider);

export function NFT_Cards() {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-4xl font-bold">Dragon-Wolf Collection</span>
          </h1>
          <div className="flex justify-center items-center space-x-2">
            <p className="text-center text-lg">A fun collection of a mashup between wolves and dragons.</p>
            {/* <br />
            <Link href="#" passHref className="link" target="_blank" rel="noopener noreferrer">
              <p className="my-2 font-medium">visit the Collection on OpenSeas</p>
            </Link> */}
          </div>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row mb-12">
            {/* NFT_0 */}
            <div className="flex flex-col bg-base-100 px-5 py-5 max-w-xs rounded-3xl">
              <Link
                href="https://ipfs.io/ipfs/bafybeichdpu3ded2ccgfznlki6djbtjcly47ho5ftyhi4doimbdfxnp4xe/0"
                passHref
                className="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://ipfs.io/ipfs/bafybeichdpu3ded2ccgfznlki6djbtjcly47ho5ftyhi4doimbdfxnp4xe/0"
                  alt="NFT_0 image"
                ></img>
              </Link>
              <div className="flex justify-between items-center">
                <div>Dragon-Wolf #0</div>
                <div>Qty: x{}</div>
              </div>
              <p className="no-underline">A majestic Alpha male dragonwolf overlooking his pack as night approaches.</p>
              <div className="flex nft-actions justify-between">
                <button onClick={handleClick} data-tokenid="0" data-value="mint" className="btn btn-success">
                  Mint
                </button>
                <button onClick={handleClick} data-tokenid="0" data-value="trade" className="btn btn-neutral">
                  Trade
                </button>
                <button onClick={handleClick} data-tokenid="0" data-value="burn" className="btn btn-error">
                  Burn
                </button>
              </div>
              {/* <Link href="#" passHref className="link">
                view on OpenSea
              </Link>{" "} */}
            </div>

            {/* NFT_1 */}
            <div className="flex flex-col bg-base-100 px-5 py-5 max-w-xs rounded-3xl">
              <Link
                href="https://ipfs.io/ipfs/bafybeichdpu3ded2ccgfznlki6djbtjcly47ho5ftyhi4doimbdfxnp4xe/1"
                passHref
                className="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://ipfs.io/ipfs/bafybeichdpu3ded2ccgfznlki6djbtjcly47ho5ftyhi4doimbdfxnp4xe/1"
                  alt="NFT_1 image"
                ></img>
              </Link>
              <div className="flex justify-between items-center">
                <div>Dragon-Wolf #1</div>
                <div>Qty: x{}</div>
              </div>
              <p className="no-underline">A majestic and shy female dragonwolf looking curious and wary.</p>
              <div className="flex nft-actions justify-between">
                <button onClick={handleClick} data-tokenid="1" data-value="mint" className="btn btn-success">
                  Mint
                </button>
                <button onClick={handleClick} data-tokenid="1" data-value="trade" className="btn btn-neutral">
                  Trade
                </button>
                <button onClick={handleClick} data-tokenid="1" data-value="burn" className="btn btn-error">
                  Burn
                </button>
              </div>
              {/* <Link href="#" passHref className="link">
                view on OpenSea
              </Link>{" "} */}
            </div>

            {/* NFT_2 */}
            <div className="flex flex-col bg-base-100 px-5 py-5 max-w-xs rounded-3xl">
              <Link
                href="https://ipfs.io/ipfs/bafybeichdpu3ded2ccgfznlki6djbtjcly47ho5ftyhi4doimbdfxnp4xe/2"
                passHref
                className="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://ipfs.io/ipfs/bafybeichdpu3ded2ccgfznlki6djbtjcly47ho5ftyhi4doimbdfxnp4xe/2"
                  alt="NFT_2 image"
                ></img>
              </Link>
              <div className="flex justify-between items-center">
                <div>Dragon-Wolf #2</div>
                <div>Qty: x{}</div>
              </div>
              <p className="no-underline">
                A friendly female dragonwolf who looks soft and inviting. Pay close attention to the wings.
              </p>
              <div className="flex nft-actions justify-between">
                <button onClick={handleClick} data-tokenid="2" data-value="mint" className="btn btn-success">
                  Mint
                </button>
                <button onClick={handleClick} data-tokenid="2" data-value="trade" className="btn btn-neutral">
                  Trade
                </button>
                <button onClick={handleClick} data-tokenid="2" data-value="burn" className="btn btn-error">
                  Burn
                </button>
              </div>

              {/* <Link href="#" passHref className="link">
                view on OpenSea
              </Link>{" "} */}
            </div>

            {/* NFT_3 */}
            <div className="flex flex-col bg-base-100 px-5 py-5 max-w-xs rounded-3xl">
              <Link
                href="https://ipfs.io/ipfs/bafybeichdpu3ded2ccgfznlki6djbtjcly47ho5ftyhi4doimbdfxnp4xe/3"
                passHref
                className="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://ipfs.io/ipfs/bafybeichdpu3ded2ccgfznlki6djbtjcly47ho5ftyhi4doimbdfxnp4xe/3"
                  alt="NFT_3 image"
                ></img>
              </Link>
              <div className="flex justify-between items-center">
                <div>Dragon-Wolf #3</div>
                <div>Qty: x{}</div>
              </div>
              <p className="no-underline">
                A dangerous and powerful Alpha female, matriarch of her pack. Claws that could rival those of Smaug.
              </p>
              <div className="flex nft-actions justify-between">
                <button onClick={handleClick} data-tokenid="3" data-value="forge" className="btn btn-warning">
                  Forge
                </button>
                <button onClick={handleClick} data-tokenid="3" data-value="burn" className="btn btn-error">
                  Burn
                </button>
              </div>

              {/* <Link href="#" passHref className="link">
                view on OpenSea
              </Link>{" "} */}
            </div>
          </div>

          {/* NFT_4 */}
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row mb-12">
            <div className="flex flex-col bg-base-100 px-5 py-5 max-w-xs rounded-3xl">
              <Link
                href="https://ipfs.io/ipfs/bafybeichdpu3ded2ccgfznlki6djbtjcly47ho5ftyhi4doimbdfxnp4xe/4"
                passHref
                className="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://ipfs.io/ipfs/bafybeichdpu3ded2ccgfznlki6djbtjcly47ho5ftyhi4doimbdfxnp4xe/4"
                  alt="NFT_4 image"
                ></img>
              </Link>
              <div className="flex justify-between items-center">
                <div>Dragon-Wolf #4</div>
                <div>Qty: x{}</div>
              </div>
              <p className="no-underline">
                A beautiful female with a crown-like set of horns. The red snout is particularly interesting.
              </p>
              <div className="flex nft-actions justify-between">
                <button onClick={handleClick} data-tokenid="4" data-value="forge" className="btn btn-warning">
                  Forge
                </button>
                <button onClick={handleClick} data-tokenid="4" data-value="burn" className="btn btn-error">
                  Burn
                </button>
              </div>

              {/* <Link href="#" passHref className="link">
                view on OpenSea
              </Link>{" "} */}
            </div>

            {/* NFT_5 */}
            <div className="flex flex-col bg-base-100 px-5 py-5 max-w-xs rounded-3xl">
              <Link
                href="https://ipfs.io/ipfs/bafybeichdpu3ded2ccgfznlki6djbtjcly47ho5ftyhi4doimbdfxnp4xe/5"
                passHref
                className="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://ipfs.io/ipfs/bafybeichdpu3ded2ccgfznlki6djbtjcly47ho5ftyhi4doimbdfxnp4xe/5"
                  alt="NFT_5 image"
                ></img>
              </Link>
              <div className="flex justify-between items-center">
                <div>Dragon-Wolf #5</div>
                <div>Qty: x{}</div>
              </div>
              <p className="no-underline">A dangerous and aggressive protector of his pack. Truly an apex predator.</p>
              <div className="flex nft-actions justify-between">
                <button onClick={handleClick} data-tokenid="5" data-value="forge" className="btn btn-warning">
                  Forge
                </button>
                <button onClick={handleClick} data-tokenid="5" data-value="burn" className="btn btn-error">
                  Burn
                </button>
              </div>
              {/* <Link href="#" passHref className="link">
                view on OpenSea
              </Link>{" "} */}
            </div>

            {/* NFT_6 */}
            <div className="flex flex-col bg-base-100 px-5 py-5 max-w-xs rounded-3xl">
              <Link
                href="https://ipfs.io/ipfs/bafybeichdpu3ded2ccgfznlki6djbtjcly47ho5ftyhi4doimbdfxnp4xe/6"
                passHref
                className="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://ipfs.io/ipfs/bafybeichdpu3ded2ccgfznlki6djbtjcly47ho5ftyhi4doimbdfxnp4xe/6"
                  alt="NFT_6 image"
                ></img>
              </Link>
              <div className="flex justify-between items-center">
                <div>Dragon-Wolf #6</div>
                <div>Qty: x{}</div>
              </div>
              <p className="no-underline">
                The rare, beautiful and hypnotizing White Wolfdragon. The author's personal favorite.
              </p>
              <div className="flex nft-actions justify-between">
                <button onClick={handleClick} data-tokenid="6" data-value="forge" className="btn btn-warning">
                  Forge
                </button>
                <button onClick={handleClick} data-tokenid="6" data-value="burn" className="btn btn-error">
                  Burn
                </button>
              </div>

              {/* <Link href="#" passHref className="link">
                view on OpenSea
              </Link>{" "} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const handleClick = (event: { currentTarget: { getAttribute: (arg0: string) => any } }) => {
  const tokenAction = event.currentTarget.getAttribute("data-value");
  const tokenId = event.currentTarget.getAttribute("data-tokenid");
  console.log("Alchemy API Key:", ALCHEMY_ID);

  switch (tokenAction) {
    case "mint":
      //call minting code
      alert(`MINT_${tokenId}`);
      break;
    case "trade":
      alert(`TRADE_${tokenId}`);
      break;
    case "forge":
      alert(`FORGE_${tokenId}`);
      break;
    default: //burninating
      alert(`BURNINATING__${tokenId}`);
      break;
  }

  console.log({ contract });
  // console.log(contract.);
  if (ALCHEMY_ID) {
    alert({ ALCHEMY_ID });
  }

  debugger;
  getContractName();
  main();
};

async function getContractName() {
  try {
    const name = await contract.name();
    console.log("Contract name:", name);
  } catch (error) {
    console.error("Error fetching contract name:", error);
  }
}

// const provider = new ethers.providers.AlchemyProvider("maticmum",`https://polygon-amoy.ALCHEMY.io/v3/${ALCHEMY_ID}`);
// const provider = new ethers.providers.AlchemyProvider("maticmum", ALCHEMY_ID);
// const provider = new ethers.providers.InfuraProvider("maticmum");

export const main = async () => {
  const name = await contract.name();
  const symbol = await contract.symbol();
  const totalSupply = await contract.totalSupply();

  console.log(`\nReading from ${contractAddress}\n`);
  console.log(`Name: ${name}`);
  console.log(`Symbol: ${symbol}`);
  console.log(`Total Supply: ${totalSupply}\n`);

  const balance = await contract.balanceOf("msg.sender");
  const balance2 = await provider.getBalance("0x52491413aFCff113bbFE8d4814124FBEc1486D27");

  console.log(`Balance Returned: ${balance}`);
  alert(`Balance Returned: ${balance}`);
  alert(`Balance2 Returned: ${balance2}`);
  console.log(`Balance Formatted: ${ethers.utils.formatEther(balance)}\n`);
};
