import { Button } from "~/components/ui/button";
import dynamic from "next/dynamic";
import { Dialog, DialogTrigger, DialogOverlay, DialogContent, DialogClose } from "~/components/ui/dialog";
import React, { useState } from "react";
import { PublicKey } from "@solana/web3.js";
const Blockend = dynamic(() => import("blockend"), {
  ssr: false,
});
import "blockend/dist/main.css";

export default function Widget({
  selectedBank,
}: {
  selectedBank: { address: {}; userInfo: { tokenAccount: { mint: {} } }; meta: { tokenSymbol: string } };
}) {
  const [isOpen, setIsOpen] = useState(false);
  console.log(selectedBank.userInfo.tokenAccount.mint.toString(), "=bank");
  return (
    <>
      <Dialog open={isOpen} modal={true} onOpenChange={(e) => setIsOpen(e)}>
        <DialogTrigger className="w-full flex justify-center my-3">
          <Button onClick={() => setIsOpen(true)} className="w-[220px]  h-[40px] py-5">
            GET {selectedBank?.meta?.tokenSymbol || ""}
          </Button>
        </DialogTrigger>
        <DialogContent className=" ">
          <DialogClose asChild></DialogClose>
          <div>
            <Blockend
              configuration={{
                defaultChains: {
                  // from: { chainId: "10" }, // optimism
                  to: { chainId: "sol" }, // solana
                },
                defaultTokens: {
                  // from: { tokenAddress: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" }, // eth on optimism
                  to: { tokenAddress: selectedBank?.userInfo?.tokenAccount?.mint?.toString() || "" }, // usdc on solana
                },
                shouldPersistTxn:isOpen,
                customTheme: {
                  text: {
                    primary: "#808080",
                    secondary: "rgba(128, 128, 128, 0.75)",
                    selected: "#4C4C4C",
                    button: "#FFFFFF",
                    success: "#49AD71",
                    error: "#FD5868",
                  },
                  background: {
                    container: "#FFFFFF",
                    secondary: "#E9E9E9",
                    networkCard: "#F6F6F6",
                    disable: "#6F7473",
                    loaderbar: "#E9E9E9",
                  },
                  border: {
                    primary: "#E0E0E0",
                    secondary: "#808080",
                    inputHighlight: "#9FC966",
                  },
                  shadow: {
                    boxShadow: "1px 1px 7px 5px rgb(255,255,255,0.1)",
                  },
                },
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
