"use client";

// import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-4xl font-bold">Dragon Wolf Collection</span>
          </h1>
          <div className="flex justify-center items-center space-x-2">
            <p className="text-center text-lg">A fun collection of a mashup between wolves and dragons.</p>
            <br />
            <Link href="#" passHref className="link" target="_blank" rel="noopener noreferrer">
              <p className="my-2 font-medium">(visit the Collection on OpenSea)</p>
            </Link>
          </div>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row mb-12">
            {/* {for loop, get info from ipfs json -- index, img, opensea url, description} */}

            {/* NFT_0 */}
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
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
              <p className="no-underline">A majestic Alpha male dragonwolf overlooking his pack as night approaches.</p>
              <Link href="#" passHref className="link">
                view on OpenSea
              </Link>{" "}
            </div>

            {/* NFT_1 */}
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
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
              <p className="no-underline">A majestic and shy female dragonwolf looking curious and wary.</p>
              <Link href="#" passHref className="link">
                view on OpenSea
              </Link>{" "}
            </div>

            {/* NFT_2 */}
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
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
              <p className="no-underline">
                A friendly female dragonwolf who looks soft and inviting. Pay close attention to the wings.
              </p>
              <Link href="#" passHref className="link">
                view on OpenSea
              </Link>{" "}
            </div>

            {/* NFT_3 */}
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
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
              <p className="no-underline">
                A dangerous and powerful Alpha female, matriarch of her pack. Claws that could rival those of Smaug.
              </p>
              <Link href="#" passHref className="link">
                view on OpenSea
              </Link>{" "}
            </div>
          </div>

          {/* NFT_4 */}
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row mb-12">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
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
              <p className="no-underline">
                A beautiful female with a crown-like set of horns. The red snout is particularly interesting.
              </p>
              <Link href="#" passHref className="link">
                view on OpenSea
              </Link>{" "}
            </div>

            {/* NFT_5 */}
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
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
              <p className="no-underline">A dangerous and aggressi…Truly an apex predator.</p>
              <Link href="#" passHref className="link">
                view on OpenSea
              </Link>{" "}
            </div>

            {/* NFT_6 */}
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
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
              <p className="no-underline">
                The rare, beautiful and hypnotizing White Wolfdragon. The author's personal favorite.
              </p>
              <Link href="#" passHref className="link">
                view on OpenSea
              </Link>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
