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

export const STATUS_PAGE = [
  ...[
    {
      name: "𝚝𝟷 Status",
      nameJSX: null,
      descriptionJSX: (
        <Typography sx={{ width: ["100%", "60rem"] }}>
          Check the status of 𝚝𝟷's services{" "}
          <Link underline="hover" external={true} href={`http://t1protocol.statuspage.io/`}>
            here
          </Link>
          .
        </Typography>
      ),
      description: null,
      subdomainOrPath: "http://t1protocol.statuspage.io/",
      isExternal: true,
    },
  ],
]

export const TEST_NAVIGATIONS = [
  ...[
    {
      name: "Bridge",
      nameJSX: null,
      description: "Use 𝚝𝟷's Canonical Bridge to deposit ETH and ERC-20s from Ethereum to 𝚝𝟷 and instantly withdraw back to Ethereum.",
      subdomainOrPath: "/bridge",
    },
    {
      name: "T-DEX",
      nameJSX: (
        <>
          T-DEX
          <br />
          <span style={{ fontStyle: "italic" }}>(under maintenance)</span>
        </>
      ),
      descriptionJSX: (
        <Typography sx={{ width: ["100%", "60rem"] }}>
          Use T-DEX, the RFQ DEX on 𝚝𝟷, to swap between WETH and USDT. Once you are done trading, you can use the bridge to withdraw funds back to L1
          instantly
          <br />
          <br />
          <Link underline="hover" external={true} href={`https://www.loom.com/share/e795859953ec4239927dc9dbb58eb834`}>
            Video Link
          </Link>
        </Typography>
      ),
      isExternal: true,
      subdomainOrPath: "https://www.loom.com/share/e795859953ec4239927dc9dbb58eb834",
    },
    {
      nameJSX: (
        <>
          T-DEX L1 (DTW)
          <br />
          <span style={{ fontStyle: "italic" }}>(under maintenance)</span>
        </>
      ),
      descriptionJSX: (
        <Typography sx={{ width: ["100%", "60rem"] }}>
          Single Block Deposit-Trade-Withdraw (DTW) enables Ethereum users to swap assets against a T-DEX on 𝚝𝟷 and receive funds in their L1 wallet
          within a single Ethereum block, ensuring atomic execution if the trade is successfully matched on 𝚝𝟷.
          <br />
          Inspired by centralized RFQ DEXs, this mode entails EIP-712 messages to enable Ethereum users (DEX aggreagtors) to swap against 𝚝𝟷 bridge
          liquidity.
          <br />
          <br />
          <Link underline="hover" external={true} href={`https://www.loom.com/share/b189bc68769145e4aa414d66e113e9f6`}>
            Video Link
          </Link>
        </Typography>
      ),
      isExternal: true,
      subdomainOrPath: "https://www.loom.com/share/b189bc68769145e4aa414d66e113e9f6",
    },
    {
      name: "Intent Bridge",
      nameJSX: null,
      descriptionJSX: (
        <Typography sx={{ width: ["100%", "60rem"] }}>
          𝚝𝟷’s Real-Time proving reduces repayment time for solvers from [60] minutes to 1 minute, increasing capital efficiency and reducing costs
          for users.
          <br />
          <br />
          <Typography fontStyle="italic">
            Note: Given the manual nature of this product, we are sharing a video while the fill-process is being automated
          </Typography>
        </Typography>
      ),
      isExternal: true,
      subdomainOrPath: "https://x.com/kisaguncan/status/1897180384699523461",
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
            <Link external={true} href={WRAP_ETH_URL}>
              <Typography
                component="span"
                sx={{
                  fontFamily: "monospace",
                  backgroundColor: "#2D2D2D",
                  padding: "2px 4px",
                  borderRadius: "4px",
                  color: "#E6A23C",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                }}
              >
                deposit (0xd0e30db0)
              </Typography>
            </Link>{" "}
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
      name: "What to build with 𝚝𝟷",
      descriptionJSX: (
        <Typography sx={{ width: ["100%", "60rem"] }}>
          Unique use cases to build on 𝚝𝟷 devnet during the{" "}
          <Link underline="hover" external={true} href={`https://ethglobal.com/events/trifecta`}>
            ETH Global Trifecta.
          </Link>
        </Typography>
      ),
      isExternal: true,
      subdomainOrPath: "https://t1protocol.notion.site/Imagine-the-possibilities-with-1bb231194dc380feb695f0daf85e8771",
    },
    {
      name: "Tutorial",
      description: `Not sure how to get started? Check out our tutorial.`,
      isExternal: true,
      subdomainOrPath: "https://github.com/t1protocol/t1/blob/canary/contracts/TUTORIAL.md",
    },
  ],
]
