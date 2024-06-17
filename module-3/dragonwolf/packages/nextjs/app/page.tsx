"use client";

import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { NFT_Cards } from "~~/components/NFT_Cards";
import { Address } from "~~/components/scaffold-eth";
import { WalletProvider } from "../components/WalletProvider";

const Home: NextPage = ({ Component, pageProps }) => {
  // const Home = () => {
  // const { address: connectedAddress } = useAccount();
  // const [dragonwolfData, setDragonwolfData] = useState<NFTData[]>([]);

  return (
    <WalletProvider>
      <NFT_Cards Component={undefined} pageProps={undefined} />
    </WalletProvider>
  );
};

function tokenToMint(tokenId: Number) {
  switch (tokenId) {
    case 0:
    case 1:
    case 2:
      //straight up mint tokenId
      alert(`MINT TOKEN ${tokenId}`);
      break;

    case 3:
      //burn tokenIds 0, 1 and mint tokenId
      alert(`MINT TOKEN ${tokenId}`);
      break;

    case 4:
      //burn tokenIds 1, 2 and mint tokenId
      alert(`MINT TOKEN ${tokenId}`);
      break;

    case 5:
      //burn tokenIds 0, 2 and mint tokenId
      break;

    default:
      //burn tokens 0, 1, 2 and mint tokenId 6
      break;
  }
}

export default Home;
