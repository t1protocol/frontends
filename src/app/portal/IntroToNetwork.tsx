"use client"

import { sendGAEvent } from "@next/third-parties/google"

import { Typography as MuiTypography } from "@mui/material"
import { TypographyProps as MuiTypographyProps } from "@mui/material/Typography"
import { styled } from "@mui/material/styles"

import TwitterSvg from "@/assets/svgs/ecosystem/twitter.svg"
import Link from "@/components/Link"
import { TDEX_URL } from "@/constants"
import { isSepolia } from "@/utils"

import Descriptions, { DescriptionItem } from "./Descriptions"

interface TypographyProps extends MuiTypographyProps {
  bold?: boolean
  primary?: boolean
}

const Typography = styled(MuiTypography, {
  shouldForwardProp: prop => prop !== "bold" && prop !== "primary",
})<TypographyProps>(({ theme, bold, primary }) => ({
  fontWeight: bold ? 600 : 400,
  color: primary ? (theme as any).vars.palette.primary.main : (theme as any).vars.palette.text.primary,
}))

const IntroToNetwork = () => {
  return (
    <>
      <Descriptions title={`Get from 𝚝𝟷 back to Ethereum in a single L1 block`}>
        <DescriptionItem>
          <Typography fontSize="2rem">
            𝚝𝟷 is a TEE-enabled rollup (L2) that introduces Real-Time Proofs (RTP) to fix fragmentation and composability challenges in scaling
            Ethereum. 𝚝𝟷 supports proving the integrity of its execution to Ethereum L1 in 6 seconds on average. Thus, unlike with optimistic and ZK
            rollups, 𝚝𝟷’s transactions are finalized in the very next Ethereum block. This enables instant withdrawals.
            <br />
            <br />
            Once on 𝚝𝟷, you can trade on{" "}
            <a href={TDEX_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>
              <strong>T-DEX</strong>
            </a>
            , our fully on-chain order book DEX, and move your assets back to L1 in the very next block!{" "}
            <Typography fontStyle="italic">(T-DEX is currently under maintenance)</Typography>
            <br />
            <br />
            {isSepolia && (
              <Typography fontSize="1.8rem" fontStyle="italic">
                This is an early devnet that may be wiped to a clean state at any time. Do not expect persistence! Note: Sepolia L1 currently tends to
                be congested, so give it some time.
              </Typography>
            )}
            <br />
            <br />
            <Typography fontSize="1.8rem" alignItems="center">
              Follow us on{" "}
              <Link
                href="https://x.com/t1protocol"
                external
                underline="hover"
                onClick={() => {
                  sendGAEvent("social_link_clicked", {
                    platform: "X",
                    url: "https://x.com/t1protocol",
                  })
                }}
              >
                <TwitterSvg />
              </Link>{" "}
              for the latest updates
            </Typography>
          </Typography>
        </DescriptionItem>
      </Descriptions>
    </>
  )
}

export default IntroToNetwork
