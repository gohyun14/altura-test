import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { type OwnedNft } from "alchemy-sdk";
import { motion } from "framer-motion";
import React from "react";

import Modal from "./Modal";

type NFTModalProps = {
  nft: OwnedNft;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NFTModal = ({ nft, setOpen }: NFTModalProps) => {
  return (
    <Modal setOpen={setOpen}>
      <div className="max-w-sm rounded-lg">
        <div className="max-h-96 overflow-hidden rounded-lg">
          <img
            src={
              nft.media?.length > 0
                ? nft.media[0]?.gateway
                : nft.rawMetadata?.image
            }
            className=""
          />
        </div>
        <div className="mt-2 p-2">
          <h1 className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold text-gray-800">
            {nft.title}
          </h1>
          <h2 className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-600">
            {nft.contract.openSea?.collectionName}
          </h2>

          {/* <h3 className="mt-3 text-gray-500">
            {nft.contract.openSea?.floorPrice
              ? "Floor: " +
                (nft.contract.openSea?.floorPrice).toString() +
                " ETH"
              : "Floor: N/A"}
          </h3> */}
          {nft.description && (
            <p className="mt-2 text-base text-gray-700 line-clamp-5">
              {nft.description}
            </p>
          )}
        </div>
        <div className="mt-2 flex w-full flex-row justify-center">
          <a
            href={`https://opensea.io/assets/ethereum/${nft.contract.address}/${nft.tokenId}`}
            target="_blank"
          >
            <motion.button
              type="button"
              className="flex flex-row items-center gap-x-1 rounded-md bg-indigo-600 py-2.5 px-3.5 text-base font-medium text-white shadow-sm hover:bg-indigo-500"
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
              Buy NFT
              <ArrowUpRightIcon className="h-5 w-5 stroke-[2]" />
            </motion.button>
          </a>
        </div>
      </div>
    </Modal>
  );
};

export default NFTModal;
