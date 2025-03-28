import { defineChain } from "viem"

export const t1_devnet = /*#__PURE__*/ defineChain({
  id: Number(process.env.NEXT_PUBLIC_CHAIN_ID_L2),
  name: `t1 ${process.env.NEXT_PUBLIC_CHAIN_VERSION}`,
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_EXTERNAL_RPC_URI_L2],
    },
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: process.env.NEXT_PUBLIC_EXTERNAL_EXPLORER_URI_L2,
      //   apiUrl: "https://explorer.devnet.t1protocol.com/api",
    },
  },
  testnet: false,
})
