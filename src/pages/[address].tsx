import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { Alchemy, Network, NftFilters } from "alchemy-sdk";
import { motion } from "framer-motion";
import { type NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import NFTList from "~/components/NFTList";

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const AddressPage: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;

  const [addressIsValid, setAddressIsValid] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    if (address && typeof address === "string") {
      void alchemy.core
        .getBalance(address, "latest")
        .then(() => setAddressIsValid(true))
        .catch(() => setAddressIsValid(false));
    }
  }, [address]);

  const {
    isLoading: isNFTDataLoading,
    isFetching: isNFTDataFetching,
    data: nftData,
  } = useQuery({
    queryKey: ["getNftsForOwner"],
    queryFn: async () => {
      const data = await alchemy.nft.getNftsForOwner(address as string, {
        omitMetadata: false,
        excludeFilters: [NftFilters.SPAM, NftFilters.AIRDROPS],
      });
      return data.ownedNfts.filter(
        (nft) =>
          nft.metadataError === undefined &&
          nft.rawMetadata?.image !== undefined
      );
    },
    enabled: !!address,
    refetchOnWindowFocus: false,
  });
  console.log(nftData);

  return (
    <div
      className="min-h-screen pt-2"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='42' height='44' viewBox='0 0 42 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='Page-1' fill='none' fill-rule='evenodd'%3E%3Cg id='brick-wall' fill='%239C92AC' fill-opacity='0.08'%3E%3Cpath d='M0 0h42v44H0V0zm1 1h40v20H1V1zM0 23h20v20H0V23zm22 0h20v20H22V23z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      <section className="relative m-3 rounded-full border-2 border-gray-900 bg-white p-2 text-center">
        <h1 className="my-2 overflow-hidden overflow-ellipsis text-lg font-medium text-gray-800 sm:text-2xl lg:text-4xl">
          {address}
        </h1>
        <span
          className="absolute -inset-1 -z-10 block -translate-x-[4px] translate-y-[6px] rounded-full border-2 border-gray-900 bg-indigo-500 shadow-lg"
          aria-hidden="true"
        ></span>
      </section>

      {addressIsValid === false ? (
        <div className="mx-auto max-w-2xl py-8 px-4 text-center sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-4xl font-medium text-gray-800 sm:text-6xl">
            Invalid Wallet
          </h1>
          <h2 className="mt-2 text-xl text-gray-700 sm:text-3xl">
            It looks like this is not a valid wallet address.
          </h2>
          <Link href="/">
            <h2 className="mt-1 text-xl text-indigo-700 underline hover:cursor-pointer sm:text-3xl">
              Try searching another address.
            </h2>
          </Link>
        </div>
      ) : (
        <NFTList
          nftData={nftData}
          isNFTDataLoading={isNFTDataLoading || isNFTDataFetching}
        />
      )}

      <div className="fixed bottom-2 left-1/2 -translate-x-1/2 sm:bottom-4 sm:left-4 sm:transform-none">
        <Link href="/">
          <motion.button
            type="button"
            className="flex flex-row items-center gap-x-1 rounded-md bg-indigo-600 py-2.5 px-3.5 text-base font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            whileTap={{
              scale: 0.9,
              borderRadius: "8px",
            }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 8,
              mass: 0.5,
            }}
          >
            <MagnifyingGlassIcon className="h-4 w-4 stroke-[3]" />
            New Search
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default AddressPage;
