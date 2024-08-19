"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import contractABI from "../utils/contract_ABI.json";
import forgeContractABI from "../utils/forge_contract_ABI.json";
import { ethers } from "ethers";
// import { isatty } from "tty";
import { useAccount, useWriteContract } from "wagmi";
import { useTransactor } from "~~/hooks/scaffold-eth";

const bafyImgLink = "https://ipfs.io/ipfs/bafybeichdpu3ded2ccgfznlki6djbtjcly47ho5ftyhi4doimbdfxnp4xe/";
const DW_CONTRACT_ADDRESS = "0xC65f39B9706504538fa642BA93190A6c14afa1Fe";
const FORGE_CONTRACT_ADDRESS = "0xBD8e63F4e29171742d81b5566ca030F3e2FdBDCE";
// const providerUrl = "https://polygon-amoy.drpc.org";
const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const providerUrl = `https://polygon-amoy.g.alchemy.com/v2/${alchemyApiKey}`;
const chainName = "amoy"; //Amoy (capital 'A'?) // 'matic-amoy', from the ethers github docs
const chainId = 80002;
const network = new ethers.Network(chainName, chainId);
// const provider = new ethers.JsonRpcProvider(providerUrl, network, { staticNetwork: network });
const provider = new ethers.JsonRpcProvider(providerUrl, network); //, { staticNetwork: network });
const privateKey = process.env.NEXT_PUBLIC_DEPLOYER_PRIVATE_KEY || "";
const wallet = new ethers.Wallet(privateKey, provider);
const dwContract = new ethers.Contract(DW_CONTRACT_ADDRESS, contractABI, wallet);
const forgeContract = new ethers.Contract(FORGE_CONTRACT_ADDRESS, forgeContractABI, wallet);
const forgingRequirements: { [key: number]: number[] } = {
  3: [0, 1], // To forge token 3, burn one each of tokens 0 and 1
  4: [1, 2], // To forge token 4, burn one each of tokens 1 and 2
  5: [0, 2], // To forge token 5, burn one each of tokens 0 and 2
  6: [0, 1, 2], // To forge token 6, burn one each of tokens 0, 1, and 2
};

export function NFT_Cards() {
  const [balances, setBalances] = useState<number[]>([]);
  const { address: connectedAddress } = useAccount();
  const [isClient, setIsClient] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchBalances = useCallback(async () => {
    if (!connectedAddress) return;

    try {
      const tokenIds = [0, 1, 2, 3, 4, 5, 6];
      const balancePromises = tokenIds.map(tokenId => forgeContract.balanceOf(connectedAddress, tokenId));
      const fetchedBalances = await Promise.all(balancePromises);
      setBalances(fetchedBalances.map((b: bigint) => Number(b)));
    } catch (error: any) {
      console.error("Error fetching contract data:", error.message);
    }
  }, [connectedAddress]);

  const checkApproval = useCallback(async () => {
    if (!dwContract || !connectedAddress || isApproved) return;

    try {
      const approvalStatus: boolean = await dwContract.isApprovedForAll(connectedAddress, FORGE_CONTRACT_ADDRESS);
      console.log("Approval status:", approvalStatus);
      // debugger;

      if (!approvalStatus) {
        console.log("Approval not set, setting approval for all tokens...");
        alert(
          `Quick note... In order to FORGE a token, first you must approve the Forging smart contract to operate for your address.\nWe'll take care of that for you now.\nClick OK to proceed and confirm the transaction request popup.`,
        );
        await approveOperator();
      }

      const checkApprovalStatus: boolean = await dwContract.isApprovedForAll(connectedAddress, FORGE_CONTRACT_ADDRESS);
      console.log(checkApprovalStatus);

      //??
      if (checkApprovalStatus) {
        //TODO: it's not getting in here, it's not waiting for approveOperator() to finish and return...
        console.log("Approval set for all tokens.");
        alert("Approval set for all tokens. You can now forge NFTs 3 - 6.");
      } else {
        console.log("Approval was already set.");
      }

      setIsApproved(true);
    } catch (error: any) {
      console.error("Error checking or setting approval:", error.message);
    }

    //this code doesn't work...
    // const approvalStatus: boolean = await dwContract.isApprovedForAll(connectedAddress, FORGE_CONTRACT_ADDRESS);
    // debugger;
    // console.log({ approvalStatus });
    // if (!approvalStatus) {
    //   const approvalTx = await dwContract.setApprovalForAll(FORGE_CONTRACT_ADDRESS, true);
    //   await approvalTx.wait();
    //   console.log("Approval set for all tokens.");
    //   alert("Approval set for all tokens. You can now forge NFTs 3 - 6.");
    // }
    // setIsApproved(true);
  }, [connectedAddress, isApproved]);

  useEffect(() => {
    if (isClient && connectedAddress) {
      fetchBalances();
      // checkApproval(); // if uncommented, this runs at app first load, which I don't think it needs.
    }
  }, [connectedAddress, fetchBalances, /*checkApproval,*/ isClient]);

  const { writeContractAsync } = useWriteContract();
  const writeTx = useTransactor();

  /* SET OPERATOR APPROVAL */
  const approveOperator = async () => {
    const writeContractAsyncWithParams = () =>
      writeContractAsync({
        address: FORGE_CONTRACT_ADDRESS,
        abi: forgeContractABI,
        functionName: "setApprovalForAll",
        args: [forgeContract.target, true],
        maxFeePerBlobGas: BigInt(0),
        blobs: [],
      });

    try {
      await writeTx(writeContractAsyncWithParams);
    } catch (error: any) {
      console.error("Operator approval failed: " + error.message);
    }
  };

  /* HANDLE MINTING */
  const handleMint = async (tokenId: number, mintAmount: number) => {
    const writeContractAsyncWithParams = () =>
      writeContractAsync({
        address: FORGE_CONTRACT_ADDRESS,
        abi: forgeContractABI,
        functionName: "mint",
        args: [tokenId, mintAmount],
        maxFeePerBlobGas: BigInt(0),
        blobs: [],
      });

    try {
      // from wagmi
      await writeTx(writeContractAsyncWithParams);
      await fetchBalances();
      console.log(`Minted token ${tokenId}: ${writeTx}`);
      alert("Token minted successfully.");
    } catch (error: any) {
      console.error("Error minting token:", error.message);
      alert("Token minting failed. Please try again. " + error.message);
    }
  };

  /* HANDLE TRADING */
  const handleTrade = async (tokenId: number, receive_tokenId: number) => {
    const writeContractAsyncWithParams = () =>
      writeContractAsync({
        address: FORGE_CONTRACT_ADDRESS,
        abi: forgeContractABI,
        functionName: "trade",
        args: [tokenId, receive_tokenId],
      });

    try {
      await checkApproval();
      await writeTx(writeContractAsyncWithParams);
      // await forgeContract.trade(tokenId, receive_tokenId);
      await fetchBalances();
      console.log(`Traded token ${tokenId} for token ${receive_tokenId} successfully: ${writeTx}`); //another or better way to do like a ".then" here while fetchBalances() is running?
      alert("Tokens traded successfully.");
    } catch (error: any) {
      console.error("Error trading tokens:", error.message);
      alert("Token trading failed. Please try again. " + error.message);
    }
  };

  /* HANDLE FORGING */
  const handleForge = async (forgeId: number, burnAndForgeAmount: number) => {
    const burnIds: number[] = forgingRequirements[forgeId];
    const writeContractAsyncWithParams = () =>
      writeContractAsync({
        address: FORGE_CONTRACT_ADDRESS,
        abi: forgeContractABI,
        functionName: "forge",
        args: [forgeId, burnAndForgeAmount],
      });
    if (
      !confirm(
        `To forge token ${forgeId} you will burn ${burnAndForgeAmount.toLocaleString()} of tokens ${burnIds.join(
          " & ",
        )}. Are you sure you want to proceed?`,
      ) // todo: what if User clicks 'cancel'?
    ) {
      return;
    }

    try {
      await checkApproval();
      await writeTx(writeContractAsyncWithParams);
      await fetchBalances();
      console.log(`Forged token ${forgeId} successfully: ${writeTx}`);
      alert("Token forged successfully.");
    } catch (error: any) {
      console.log({ error });
      if (error.response && error.response.status === 400) {
        console.warn("Received a 400 error, but the operation might still be successful.");
        alert("Token forged successfully, but received a warning: " + error.message);
      } else {
        console.error("Error forging token:", error.message);
        alert("Token forging failed. Please try again. " + error.message);
      }
    }
  };

  /* HANDLE BURN */
  const handleBurn = async (tokenId: number, burnAmount: number) => {
    const writeContractAsyncWithParams = () =>
      writeContractAsync({
        address: FORGE_CONTRACT_ADDRESS,
        abi: forgeContractABI,
        functionName: "burn",
        args: [connectedAddress, tokenId, burnAmount],
      });

    try {
      await checkApproval();
      await writeTx(writeContractAsyncWithParams);
      await fetchBalances();
      console.log(`Burned ${burnAmount} of token ${tokenId} successfully: ${writeTx}`);
      console.log("🔥 🔥 🔥 🔥  TROGDOR STRIKES AGAIN!!!  🔥 🔥 🔥 🔥");
      alert("Tokens burned successfully.");
    } catch (error: any) {
      console.error("Error burning tokens:", error.message);
      alert("Token burning failed. Please try again. " + error.message);
    }
  };

  /* HANDLE CLICK */
  const handleClick = async event => {
    const tokenAction = event.currentTarget.getAttribute("data-value");
    const tokenId = parseInt(event.currentTarget.getAttribute("data-tokenid"));

    switch (tokenAction) {
      case "mint": // MINTING
        if (tokenId >= 3) return alert("You cannot mint this token - it must be forged."); //this code should never run because the UI will never allow minting of tokens 3-6

        const mintAmount = prompt("Enter the quantity of tokens to mint:") || "1";
        if (mintAmount) {
          await handleMint(tokenId, parseInt(mintAmount));
        }
        break;

      case "trade": // TRADING
        const getTokenIdInput: string =
          prompt(
            "You can trade any token, but you can only RECEIVE tokens 0-2.\nEnter the ID of the token you want to receive (0-2):\n(defaults to Dragon-Wolf #0 if left blank)",
          ) || "0";
        // debugger;

        await handleTrade(tokenId, parseInt(getTokenIdInput));
        break;

      case "forge": // FORGING
        alert(
          `To FORGE token ${tokenId} you must burn tokens ${forgingRequirements[tokenId].join(
            " & ",
          )}. Click OK to proceed.`,
        );

        const burnAndForgeAmount = prompt("Enter the quantity of tokens to forge / burn:") || "1";
        await handleForge(tokenId, parseInt(burnAndForgeAmount));
        break;

      default: // BURNINATING
        const burnAmount =
          prompt(
            "How many tokens do you want to burn? Please note that manually burning tokens has no benefit and you will not receive anything in return.",
          ) || "1";

        await handleBurn(tokenId, parseInt(burnAmount));
        console.log("🔥 🔥 🔥 🔥  TROGDOR STRIKES AGAIN!!!  🔥 🔥 🔥 🔥");
        break;
    }
  };

  if (!isClient || !connectedAddress) {
    if (!isClient) {
      // prevent hydration error
      // alert("hydration error -- nothing to display");
      // return null;
    } else {
      //check whether an address is connected and display message to User
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-center text-lg font-bold">
            Please connect your wallet to view and interact with the Dragon-Wolf Collection.
          </p>
        </div>
      );
    }
  }

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-4xl font-bold">DragonWolf Collection</span>
          </h1>
          <div className="flex justify-center items-center space-x-2">
            <p className="text-center text-lg">A fun collection of a mashup between wolves and dragons.</p>
          </div>

          <div className="px-5">
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">
                (This site is still a work in progress. Please use any of my links in the Footer below to send me any
                feedback. GM and happy hodling! 🚀🌕)
              </p>
            </div>
          </div>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-1 px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
            {balances.map((balance, index) => (
              <div key={index} className="flex flex-col bg-base-100 px-5 py-5 rounded-3xl">
                <Link
                  href={`${bafyImgLink}${index}`}
                  passHref
                  className="link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={`${bafyImgLink}${index}`} alt={`NFT_${index} image`} className="mx-auto" />
                </Link>
                <div className="flex justify-between items-center">
                  <div>Dragon-Wolf #{index}</div>
                  <div>Qty: {balance.toLocaleString()}</div>
                </div>
                <p className="no-underline">
                  {index === 0
                    ? "A majestic Alpha male dragonwolf overlooking his pack as night approaches."
                    : index === 1
                      ? "A majestic and shy female dragonwolf looking curious and wary."
                      : index === 2
                        ? "A friendly female dragonwolf who looks soft and inviting. Pay close attention to the wings."
                        : index === 3
                          ? "A dangerous and powerful Alpha female, matriarch of her pack. Claws that could rival those of Smaug."
                          : index === 4
                            ? "A beautiful female with a crown-like set of horns. The red snout is particularly interesting."
                            : index === 5
                              ? "A dangerous and aggressive protector of his pack. Truly an apex predator."
                              : "The rare, beautiful and hypnotizing White Wolfdragon. The author's personal favorite."}
                </p>
                <div className="flex nft-actions justify-between">
                  {index < 3 ? (
                    <>
                      <button onClick={handleClick} data-tokenid={index} data-value="mint" className="btn btn-success">
                        Mint
                      </button>
                      <button onClick={handleClick} data-tokenid={index} data-value="trade" className="btn btn-neutral">
                        Trade
                      </button>
                      <button onClick={handleClick} data-tokenid={index} data-value="burn" className="btn btn-error">
                        Burn
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={handleClick} data-tokenid={index} data-value="forge" className="btn btn-warning">
                        Forge
                      </button>
                      <button onClick={handleClick} data-tokenid={index} data-value="trade" className="btn btn-neutral">
                        Trade
                      </button>
                      <button onClick={handleClick} data-tokenid={index} data-value="burn" className="btn btn-error">
                        Burn
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
// shout out to TROGDOR the (original) BURNINATOR. https://en.wikifur.com/w/images/thumb/d/d3/Trogdor_Original_Design.png/708px-Trogdor_Original_Design.png}
