import { type OwnedNft } from "alchemy-sdk";

type NFTCardProps = {
  nft: OwnedNft;
};

const NFTCard = ({ nft }: NFTCardProps) => {
  return (
    <div className="group rounded-lg bg-white shadow-lg hover:cursor-pointer hover:shadow-xl">
      <div className="flex h-[16rem] w-full items-center justify-center overflow-hidden rounded-t-lg">
        {nft.media?.find((media) => media.format === "mp4") ? (
          <video width="320" height="240">
            <source src={nft.media[0]?.gateway} type="video/mp4" />
          </video>
        ) : (
          <img
            src={
              nft.media?.length > 0
                ? nft.media[0]?.gateway
                : nft.rawMetadata?.image
            }
            className="duration-200 motion-safe:group-hover:scale-105"
          />
        )}
      </div>
      <div className="p-2">
        {nft.title ? (
          <h1 className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold text-gray-800">
            {nft.title}
          </h1>
        ) : (
          <h1 className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold text-gray-800">
            {nft.tokenId}
          </h1>
        )}
        {nft.contract.openSea?.collectionName ? (
          <h2 className="overflow-hidden text-ellipsis whitespace-nowrap text-gray-800">
            {nft.contract.openSea?.collectionName}
          </h2>
        ) : (
          <h2 className="mt-3 h-6"></h2>
        )}
        {nft.contract.openSea?.floorPrice ? (
          <h3 className="mt-3 text-gray-500">
            Floor: {(nft.contract.openSea?.floorPrice).toFixed(3)} ETH
          </h3>
        ) : (
          <h3 className="mt-3 h-6"></h3>
        )}
      </div>
    </div>
  );
};

export default NFTCard;
