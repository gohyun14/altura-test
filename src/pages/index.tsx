import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const Home: NextPage = () => {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = () => {
    if (searchValue !== "") {
      void router.push(`/${searchValue}`);
      setSearchValue("");
    }
  };

  return (
    <>
      <>
        <Head>
          <title>Search</title>
          <meta name="description" content="Search Page" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <div className="mx-auto mt-28 w-4/5 text-center">
          <h1 className="mb-3 text-4xl font-extrabold leading-none tracking-tight text-gray-900 sm:mb-4 md:text-5xl lg:text-6xl">
            Search Any Wallet&apos;s NFTs
          </h1>
          <p className="mb-6 text-lg font-normal text-gray-500 sm:px-16 lg:text-xl xl:px-48">
            Search any valid wallet address, and you can see all of the NFTs
            they hold! Click on an NFT to see more specific information such as
            the NFT&apos;s description!
          </p>
          <div className="mx-auto max-w-lg items-center rounded-md bg-indigo-100 p-3 sm:flex sm:py-7 sm:px-9">
            <div className="relative mx-auto mr-2 w-full text-center">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                id="search"
                name="search"
                className="sm:text-md block h-12 w-full rounded-xl border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 text-gray-600 placeholder-gray-400 focus:border-indigo-500 focus:placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Search Wallet Address"
                type="search"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
            </div>
            <motion.button
              type="button"
              className="mt-2 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-8 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-indigo-800 sm:mt-0"
              onClick={handleSearch}
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
              Search
            </motion.button>
          </div>
        </div>
      </>
    </>
  );
};

export default Home;
