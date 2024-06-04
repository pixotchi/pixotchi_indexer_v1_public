import { createConfig, mergeAbis } from "@ponder/core";
import { http } from "viem";

import { TransparentUpgradeableProxyAbi } from "./abis/TransparentUpgradeableProxyAbi";
import {PixotchiTokenAbi} from "./abis/PixotchiTokenAbi";
import { Claimer_0x85bbAbi } from "./abis/Claimer_0x85bbAbi";
import {PixotchiNFT_0x4c13Abi} from "./abis/PixotchiNFT_0x4c13Abi";
import {PixotchiNFT_0x1c4eAbi} from "./abis/PixotchiNFT_0x1c4eAbi";

export default createConfig({
  networks: {
    baseSepolia: {
      chainId: 84532,
      transport: http(process.env.PONDER_RPC_URL_84532),
    }
  },
  contracts: {
    PixotchiNFT: {
      abi: mergeAbis([TransparentUpgradeableProxyAbi, PixotchiNFT_0x1c4eAbi, PixotchiNFT_0x4c13Abi,]),
      address: "0x68841Eb18D3403Da91193A71dF0fa371e39988C4",
      network: "baseSepolia",
      startBlock: 8152988,
      maxBlockRange: 10000,
    },
    PixotchiToken: {
      abi: PixotchiTokenAbi,
      address: "0xc64F740D216B6ec49e435a8a08132529788e8DD0",
      network: "baseSepolia",
      startBlock: 8150921,
      maxBlockRange: 10000,
      filter: {
        event: "Transfer",
        args: {
          to: ["0xC3f88d5925d9aa2ccc7b6cb65c5F8c7626591Daf"]
        },
      },
    },
    Claimer: {
      abi: mergeAbis([TransparentUpgradeableProxyAbi, Claimer_0x85bbAbi]),
      address: "0x02c4418d2db5bd162c5b7f1f813714d301f18876",
      network: "baseSepolia",
      startBlock: 8150926,
      maxBlockRange: 10000,
    }
  },
});
