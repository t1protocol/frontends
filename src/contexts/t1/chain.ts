import { defineChain } from "viem"

export const t1 = /*#__PURE__*/ defineChain({
  id: 3_151_908,
  name: "T1",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["http://34.171.95.193:8545"],
    },
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://explorer.devnet.t1protocol.com/",
      //   apiUrl: "https://explorer.devnet.t1protocol.com/api",
    },
  },
  testnet: false,
})
