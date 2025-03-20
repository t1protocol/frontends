import { Typography } from "@mui/material"

import Link from "@/components/Link"
import { isSepolia } from "@/utils"

import { DOCUMENTATION_URL, EXPLORER_URL, L1_NAME, L2_NAME, SEPOLIA_URL, TDEX_URL, TDEX_URL_SEPOLIA, WRAP_ETH_URL } from "./common"

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
      description: "Use 𝚝𝟷’s Canonical Bridge to deposit ETH and ERC-20s from Ethereum to 𝚝𝟷 and instantly withdraw back to Ethereum.",
      subdomainOrPath: "/bridge",
    },
    {
      name: "T-DEX",
      descriptionJSX: (
        <Typography sx={{ width: ["100%", "60rem"] }}>
          Use T-DEX, the RFQ DEX on 𝚝𝟷, to swap between WETH and USDT. Once you are done trading, you can use the bridge to withdraw funds back to L1
          instantly
          <br />
          <br />
          <Typography fontStyle="italic">Note: T-DEX currently supports swaps and limit orders</Typography>
        </Typography>
      ),
      isExternal: true,
      subdomainOrPath: TDEX_URL,
    },
    {
      name: "T-DEX for L1",
      descriptionJSX: (
        <Typography sx={{ width: ["100%", "60rem"] }}>
          Single Block Deposit-Trade-Withdraw (DTW) enables Ethereum users to swap assets against a T-DEX on 𝚝𝟷 and receive funds in their L1 wallet
          within a single Ethereum block, ensuring atomic execution if the trade is successfully matched on 𝚝𝟷.
          <br />
          Inspired by centralized RFQ DEXs, this mode entails EIP-712 messages to enable Ethereum users (DEX aggreagtors) to swap against 𝚝𝟷 bridge
          liquidity.
          <br />
          <br />
          <Typography fontStyle="italic">Note: Make sure you are on Sepolia</Typography>
        </Typography>
      ),
      isExternal: true,
      subdomainOrPath: TDEX_URL_SEPOLIA,
    },
    {
      name: "Hackathon Project Ideas",
      description: `Check out some ideas for hackathon projects for ETH Global Trifecta.`,
      descriptionJSX: (
        <Typography sx={{ width: ["100%", "60rem"] }}>
          Check out some ideas for hackathon projects for{" "}
          <Link underline="hover" external={true} href={`https://ethglobal.com/events/trifecta`}>
            ETH Global Trifecta.
          </Link>
        </Typography>
      ),
      isExternal: true,
      subdomainOrPath: "https://t1protocol.notion.site/Imagine-the-possibilities-with-1bb231194dc380feb695f0daf85e8771",
    },
  ],
]

export const RESOURCES = [
  ...[
    ...(isSepolia
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
        name: `Wrap your ${process.env.NEXT_PUBLIC_SCROLL_ENVIRONMENT} ETH`,
        descriptionJSX: (
          <Typography sx={{ width: ["100%", "60rem"] }}>
            If you need WETH, call{" "}
            <Typography
              component="span"
              sx={{
                fontFamily: "monospace",
                backgroundColor: "#2D2D2D",
                padding: "2px 4px",
                borderRadius: "4px",
                color: "#E6A23C",
                fontSize: "1.5rem",
              }}
            >
              deposit (0xd0e30db0)
            </Typography>{" "}
            to wrap your {process.env.NEXT_PUBLIC_SCROLL_ENVIRONMENT} ETH before bridging into 𝚝𝟷.
          </Typography>
        ),
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
    {
      name: "Tutorial",
      description: `Not sure how to get started? Check out our tutorial.`,
      isExternal: true,
      subdomainOrPath: "https://github.com/t1protocol/t1/blob/canary/contracts/TUTORIAL.md",
    },
  ],
]
