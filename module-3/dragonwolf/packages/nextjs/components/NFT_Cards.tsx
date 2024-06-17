"use client";

import Link from "next/link";
import contractABI from "../utils/contract_ABI.json";
import { /*Address as AddressType,*/ checksumAddress, getAddress } from "viem";
import { Address, Balance } from "~~/components/scaffold-eth";
import { useAccount, useReadContract, useBalance } from "wagmi";
import { AlchemyProvider } from "@ethersproject/providers";
import { ethers, JsonRpcProvider } from "ethers";
// import { * } from "../utils/myContractData.ts";
import { AddressProps } from "~~/components/scaffold-eth/Address";
import { useEffect, useState } from "react";
import { useWallet, WalletProvider } from "./WalletProvider";


// dotenv.config();
const contractAddress = "0xC6760c2Fd1809742B4577aAaa4013C92e9Cd89bB";
const providerUrl = 'https://polygon-amoy.drpc.org';
const chainName = "amoy";
const chainId = 80002;
const network = new ethers.Network(chainName, chainId);
const provider = new ethers.JsonRpcProvider(providerUrl, network, {staticNetwork: network});
const contract = new ethers.Contract(contractAddress, contractABI, provider);
const ALCHEMY_ID = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
// const signer = provider.getSigner();


export async function NFT_Cards({ Component, pageProps }) {
  const { address } = useWallet();
  const [balances, setBalances] = useState<number[]>([]); // State to hold balances for different NFTs
  const { address: connectedAddress } = useAccount();
  console.log({connectedAddress});
  
  const tokenQty = await contract.balanceOf(address, 0);
  console.log({address});
  console.log({tokenQty});
  debugger;


// try {
//   }
//     catch (error) {
//     console.error("Error fetching contract data:", error);
//   }

  useEffect(() => {
    const fetchBalances = async () => {
      if (!address) {
        console.error("No wallet address found.");
        return;
      }

      try {
        const tokenIds = [0, 1, 2, 3, 4, 5, 6]; // Add more token IDs as needed
        const balancePromises = tokenIds.map(tokenId => contract.balanceOf(address, tokenId));
        const fetchedBalances = await Promise.all(balancePromises);
        setBalances(fetchBalances.map(b => b.toNumber()));
      } catch (error) {
        console.error('Error fetching contract data:', error);
      }
    };

    fetchBalances();
  }, [address]);

  
  
  const { data: tokenBal } = useBalance({
    address: connectedAddress,
  })
  // const { data: tokenBal } = useReadContract({
  //   ...contractABI,
  //   address: connectedAddress,
  //   functionName: 'balanceOf',
  //   // args: [checksumAddress],
  //   // args: [connectedAddress],
  // })
  // const tokenQuantity = contract.balanceOf(connectedAddress, 0);
  console.log({tokenBal});
  // debugger;
  // getContractData();

  //more code x logic here
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

        <div className="flex-grow bg-base-300 w-full mt-1 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row mb-12">
            {balances.map((balance, index) => (
              // {/* NFT_0 */}
            <div key={index} className="flex flex-col bg-base-100 px-5 py-5 max-w-xs rounded-3xl">
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
                <div>Dragon-Wolf #{index}</div>
                <div>`Qty: ${tokenQty}(tokenQty), {balance}(balance)`</div>
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
                ))}

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
  switch (tokenAction) {
    case "mint":
      //call minting code
      break;
    case "trade":
      break;
    case "forge":
      break;
    default: //burninating
      console.log("TROGDOR STRIKES AGAIN!!!");
      break;
  }
        
  // debugger;
  main();
};

async function getContractData() {
  

}

export const main = async () => {

  
  
  // try {
  //   const nftURI = await contract.tokenURI(6);
  //   console.log("TokenURI:", nftURI);
  // } catch (error) {
  //   console.error("Error fetching contract data:", error);
  // }


  // debugger;
   try {
    const balance2 = await contract.balanceOf("0x52491413aFCff113bbFE8d4814124FBEc1486D27", 0);
    console.log(`Balance Returned: ${balance2}`);
    alert(`Balance2 Returned: ${balance2}`);
  } catch (error) {
    console.error("Error fetching contract data:", error);
  }
  
 
}