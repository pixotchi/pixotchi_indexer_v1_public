import { createConfig, mergeAbis } from "@ponder/core";
import { http } from "viem";

import { TransparentUpgradeableProxyAbi } from "./abis/TransparentUpgradeableProxyAbi";
import {PixotchiTokenAbi} from "./abis/PixotchiTokenAbi";
import {PixotchiNFT_0x4529Abi} from "./abis/PixotchiNFT_0x4529Abi";


export default createConfig({
  networks: {
    base: { chainId: 8453, transport: http(process.env.PONDER_RPC_URL_8453),
    }
  },
  contracts: {
    PixotchiNFT: {
      abi: mergeAbis([TransparentUpgradeableProxyAbi, PixotchiNFT_0x4529Abi, PixotchiNFT_0x4529Abi]),
      address: "0x9fde194ae83aed15dfc77be30552fb8651b366a6",
      network: "base",
      startBlock: 10490352,
      maxBlockRange: 10000,

    },
    PixotchiToken: {
      abi: PixotchiTokenAbi,
      address: "0x546d239032b24eceee0cb05c92fc39090846adc7",
      network: "base",
      startBlock: 9995258,
      maxBlockRange: 10000,

      filter: {
        event: "Transfer",
        args: {
          to: ["0x810eb0dA4BBe210A22746B917853174C73b17f50"]
        },
      },
    }
  },
});
