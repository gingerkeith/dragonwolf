"use client";

// import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";

interface NFTData {
  nftImgUrl: string;
  nftDesc: string;
}

//const Home: NextPage = () => {
const Home = () => {
  console.log("Home comp rendered"); //del
  // const { address: connectedAddress } = useAccount();
  const [dragonwolfData, setDragonwolfData] = useState<NFTData[]>([]);

  useEffect(() => {
    async function fetchNFTMetadata() {
      try {
        const ipfsUrl = "https://ipfs.io/ipfs/QmSMdgSZet2gp5MR9CFFNb5Qro2LVKT7hu5b4sZ4PCTWFp/";
        const response = await axios.get(ipfsUrl);
        const jsonData = response.data;

        const nftDataArr: NFTData[] = jsonData.map((nft: any, index: number) => ({
          nftImgUrl: nft.image,
          nftDesc: nft.attributes.description,
          key: index,
        }));
        setDragonwolfData(nftDataArr);
        console.log("NFT Data:", nftDataArr); //del
      } catch (error) {
        console.error("Error while fetching NFT metadata:", error);
      }
    }

    fetchNFTMetadata();
  }, []);
  return (
    <div>
      <p>Static text to verify rendering</p>
      {dragonwolfData.length > 0 && <p>Data is available</p>}
    </div>
  );

  // return (
  //   <>
  //     <div className="flex items-center flex-col flex-grow pt-10">
  //       <div className="px-5">
  //         <h1 className="text-center">
  //           <span className="block text-4xl font-bold">Dragon Wolf Collection</span>
  //         </h1>
  //         <div className="flex justify-center items-center space-x-2">
  //           <p className="text-center text-lg">A fun collection of a mashup between wolves and dragons.</p>
  //           <br />
  //           <Link href="#" passHref className="link" target="_blank" rel="noopener noreferrer">
  //             <p className="my-2 font-medium">(visit the Collection on OpenSeas)</p>
  //           </Link>
  //         </div>
  //       </div>

  //       <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
  //         <div className="flex justify-center items-center gap-12 flex-col sm:flex-row mb-12">
  //           {dragonwolfData.map((nft, index) => (
  //             <div
  //               key={index}
  //               className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl"
  //             >
  //               <p>does this text show up?</p>
  //               <Link href={nft.nftImgUrl} passHref className="link" target="_blank" rel="noopener noreferrer">
  //                 <img src={nft.nftImgUrl} alt={`NFT_${index} image`} />
  //               </Link>
  //               <p className="no-underline">{nft.nftDesc}</p>
  //               {/* <Link href="#" passHref className="link">
  //                 view on OpenSea
  //               </Link>{" "} */}
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
};

export default Home;
