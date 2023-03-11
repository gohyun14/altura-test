import { useState } from "react";
import { type OwnedNft } from "alchemy-sdk";
import { AnimatePresence } from "framer-motion";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import NFTCard from "./NFTCard";
import NFTModal from "./NFTModal";
import LoadingCard from "./LoadingCard";

type NFTListProps = {
  nftData: OwnedNft[] | undefined;
  isNFTDataLoading: boolean;
};

const NFTList = ({ nftData, isNFTDataLoading }: NFTListProps) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<OwnedNft | undefined>(
    undefined
  );
  const [searchValue, setSearchValue] = useState("");

  if (!isNFTDataLoading && nftData?.length === 0) {
    return (
      <div className="mx-auto max-w-2xl py-8 px-4 text-center sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-4xl font-medium text-gray-800 sm:text-6xl">
          Wallet Empty
        </h1>
        <h2 className="mt-2 text-xl text-gray-700 sm:text-3xl">
          It looks like this wallet does not have any NFTs.
        </h2>
        <Link href="/">
          <h2 className="mt-1 text-xl text-indigo-700 underline hover:cursor-pointer sm:text-3xl">
            Try searching another address.
          </h2>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-2xl py-8 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mx-2 mb-6 flex max-w-lg items-center rounded-md p-[6px] sm:mx-auto">
          <div className="relative mx-auto mr-2 w-full text-center">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-indigo-700"
                aria-hidden="true"
              />
            </div>
            <input
              id="search"
              name="search"
              className="sm:text-md block h-11 w-full rounded-xl border border-indigo-700 bg-indigo-100 py-2 pl-10 pr-3 leading-5 text-indigo-700 placeholder-indigo-700 focus:border-indigo-500 focus:placeholder-indigo-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="Search NFTs"
              type="search"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {isNFTDataLoading
            ? [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <li key={i}>
                  <LoadingCard />
                </li>
              ))
            : nftData &&
              nftData
                .filter(
                  (nft) =>
                    nft.title?.toLowerCase().includes(searchValue) ||
                    nft.description?.toLowerCase().includes(searchValue) ||
                    nft.tokenId?.toLowerCase().includes(searchValue)
                )
                .map((nft) => (
                  <li
                    key={
                      nft.title +
                      nft.tokenId +
                      Math.random().toString() +
                      Math.random().toString()
                    }
                    onClick={() => {
                      setSelectedNFT(nft);
                      setShowModal(true);
                    }}
                  >
                    <NFTCard nft={nft} />
                  </li>
                ))}
        </ul>
      </div>
      <AnimatePresence>
        {showModal && selectedNFT && (
          <NFTModal setOpen={setShowModal} nft={selectedNFT} />
        )}
      </AnimatePresence>
    </>
  );
};

export default NFTList;
