import { isMainnet } from "@/utils"

import { DOCUMENTATION_URL, EXPLORER_URL, L1_NAME, L2_NAME, SEPOLIA_URL, TDEX_URL, WRAP_ETH_URL } from "./common"

export const SITE_MAP = {
  Home: "/portal",
  Ecosystem: "/ecosystem",
  Bridge: "/bridge",
  L1Explorer: EXPLORER_URL.L1,
  L2Explorer: EXPLORER_URL.L2,
  RollupExplorer: "/rollupscan",
  Architecture: "/blog/architecture",
}

export const TEST_NAVIGATIONS = [
  ...[
    {
      name: "Bridge",
      description: "Use 𝚝𝟷’s Canonical Bridge to instantly transfer ETH and ERC-20s between Ethereum L1 and 𝚝𝟷.",
      subdomainOrPath: "/bridge",
    },
    {
      name: "T-DEX",
      description: `Use T-DEX, the RFQ DEX on 𝚝𝟷, to swap between WETH and USDT on 𝚝𝟷. Once you are done trading, you can use the bridge to withdraw funds back to L1 instantly. Note: T-DEX currently supports swaps and limit orders.`,
      isExternal: true,
      subdomainOrPath: TDEX_URL,
    },
  ],
]

export const RESOURCES = [
  ...[
    ...(!isMainnet
      ? [
          {
            name: "Faucet",
            description: `Get ${process.env.NEXT_PUBLIC_SCROLL_ENVIRONMENT} ETH.`,
            isExternal: true,
            subdomainOrPath: SEPOLIA_URL.FAUCET,
          },
        ]
      : []),
    ...[
      {
        name: "Wrap your ETH",
        description: `If you need ${process.env.NEXT_PUBLIC_SCROLL_ENVIRONMENT} Wrapped ETH, use this deposit function to wrap your ${process.env.NEXT_PUBLIC_SCROLL_ENVIRONMENT} ETH before bridging into 𝚝𝟷.`,
        isExternal: true,
        subdomainOrPath: WRAP_ETH_URL,
      },
    ],
    {
      name: "L1 Block Explorer",
      description: `See your L1 transactions on ${L1_NAME}'s block explorer.`,
      isExternal: true,
      subdomainOrPath: EXPLORER_URL.L1,
    },
    {
      name: "L2 Block Explorer",
      description: "See your L2 transactions on our fork of Blockscout.",
      isExternal: true,
      subdomainOrPath: EXPLORER_URL.L2,
    },
    {
      name: "Documentation",
      description: `See the full ${L2_NAME} User Guide here.`,
      isExternal: true,
      subdomainOrPath: DOCUMENTATION_URL[process.env.NEXT_PUBLIC_SCROLL_ENVIRONMENT as string],
    },
    {
      name: "Website",
      description: `Check out our official website here.`,
      isExternal: true,
      subdomainOrPath: "https://t1protocol.com",
    },
  ],
]
