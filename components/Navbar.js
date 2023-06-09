import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ConnectWallet,
  useAddress,
  useNetwork,
  useNetworkMismatch,
  ChainId,
} from "@thirdweb-dev/react";

import { toast } from "./ui/toast"
import { UserDropdown } from "./";
import { capitalizeFirstLetter } from "../utils";
import { navlinks } from "../constants";
import { useStateContext } from "../context";
import Leaflet from "./shared/Leaflet";
import {
  DarkspaceLogo,
  SearchIcon,
  MenuIcon,
  WalletIcon,
} from "../assets/Icons";
import useWindowSize from "../lib/hooks/useWindowSize";

const Navbar = () => {
  const { isMobile, isDesktop } = useWindowSize();
  const [openPopover, setOpenPopover] = useState(false);
  const [openWalletPopover, setOpenWalletPopover] = useState(false);
  const [signInClicked, setSignInClicked] = useState(false);
  const { setActivePage } = useStateContext();

  const address = useAddress();
  const [, switchNetwork] = useNetwork();
  const isWrongChain = useNetworkMismatch();

  useEffect(() => {
    if (isWrongChain && switchNetwork) {
      toast({
        icon: 'X',
        title: "Switching to Goerli testnet in 3 seconds...",
        message: "Wrong network detected, switch back to goerli testnet.",
        type: "error",
      })
      setTimeout(() => {
        switchNetwork(ChainId.Goerli);
      }, 3000);
    }
  }, [isWrongChain, address, switchNetwork]);

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className=" lg:flex-1 flex flex-row lg:max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-white/5 rounded-[100px] ">
        <input
          type="text"
          placeholder="Search for images"
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-zinc-500 text-white bg-transparent outline-none"
        />
        <div className="flex sm:divide-x-0 divide-x divide-zinc-600">
          <div className="sm:pr-0 pr-2">
            <div className="w-[52px] h-full rounded-[20px] bg-violet-500 flex justify-center items-center cursor-pointer">
              <SearchIcon className="w-[20px] h-[20px] object-contain text-white" />
            </div>
          </div>
          <div className="sm:pl-0 pl-2">
            <div
              onClick={() => setOpenWalletPopover((prev) => !prev)}
              className="flex w-[52px] h-full rounded-[20px] bg-violet-500 sm:hidden justify-center items-center cursor-pointer"
            >
              <WalletIcon className="w-[20px] h-[20px] object-contain text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="sm:flex hidden flex-row justify-end gap-4">
        <ConnectWallet
          className="rounded-[100px]"
          accentColor={isWrongChain ? "#ef4444" : "#8B5CF6"}
          colorMode="dark"
        />
        <div className="w-[52px] h-[52px] overflow-hidden rounded-full bg-white/5 flex justify-center items-center cursor-pointer">
          <UserDropdown onProfileClick={() => setActivePage("profile")} />
        </div>
      </div>

      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <button onClick={() => setOpenPopover((prev) => !prev)}>
          <MenuIcon className="w-[34px] h-[34px] text-violet-500 object-contain cursor-pointer" />
        </button>
        <Link onClick={() => setActivePage("dashboard")} href="/dashboard">
          <div className="w-[40px] h-[40px] rounded-[10px] bg-white/5 flex justify-center items-center cursor-pointer">
            <DarkspaceLogo width={50} height={50} className="w-[60%]" />
          </div>
        </Link>
        <div className="w-[34px] h-[34px] overflow-hidden rounded-full bg-zinc-800 flex justify-center items-center cursor-pointer">
          <UserDropdown onProfileClick={() => setActivePage("profile")} />
        </div>
      </div>
      {openPopover && isMobile && (
        <Leaflet setShow={setOpenPopover}>
          <div className="w-full rounded-md bg-zinc-800 border-0 p-2 sm:w-56">
            {navlinks.map((link) => (
              <Link
                key={link.name}
                href={link.link}
                onClick={() => setActivePage(link.name)}
                className="flex flex-row items-center justify-start text-zinc-200 space-x-2 relative w-full rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-zinc-600"
              >
                {link.icon}
                <p className="text-sm ">{capitalizeFirstLetter(link.name)}</p>
              </Link>
            ))}
          </div>
        </Leaflet>
      )}
      {openWalletPopover && isMobile && (
        <Leaflet setShow={setOpenWalletPopover}>
          <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
            <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-zinc-800 px-4 py-6 pt-8 text-center md:px-16">
              <Link href="/">
                <DarkspaceLogo className="h-10 w-10" />
              </Link>
              <h3 className="font-display text-zinc-200 text-2xl font-bold">
                Connect Wallet
              </h3>
              <p className="text-sm text-zinc-400">
                Connect your wallet seamlessly after installing Metamask 🦊.
              </p>
            </div>

            <div
              className={`flex justify-center ${isWrongChain ? "bg-[#ef4444]" : "bg-[#8B5CF6]"
                } space-y-4 px-4 py-8 md:px-16`}
            >
              <ConnectWallet
                className="border-0"
                accentColor={isWrongChain ? "#ef4444" : "#8B5CF6"}
                colorMode="dark"
              />
            </div>
          </div>
        </Leaflet>
      )}
    </div>
  );
};

export default Navbar;
