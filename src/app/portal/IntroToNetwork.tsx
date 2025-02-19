"use client"

import { Typography as MuiTypography } from "@mui/material"
import { TypographyProps as MuiTypographyProps } from "@mui/material/Typography"
import { styled } from "@mui/material/styles"

import { isMainnet } from "@/utils"

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
      <Descriptions title={`To ${isMainnet ? "𝚝𝟷 mainnet" : "𝚝𝟷 devnet"} and back in a single bound`}>
        <DescriptionItem>
          <Typography fontSize="2rem">
            𝚝𝟷 is a high-speed rollup that enables near-instant withdrawals to Ethereum. Unlike optimistic and ZK rollups, 𝚝𝟷 transactions are
            finalized in the very next Ethereum block.
            <br />
            <br />
            𝚝𝟷 is powered by a custom Reth implementation running inside a TEE, allowing it to trustfully post state updates to Ethereum every block.
            This ensures withdrawals are completed in seconds, not minutes or hours.
            <br />
            <br />
            Once on 𝚝𝟷, you can trade on{" "}
            <a href="https://t-dex.devnet.t1protocol.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>
              <strong>T-DEX</strong>
            </a>
            , our fully on-chain order book DEX, and move your assets back to L1 in the very next block!
          </Typography>
        </DescriptionItem>
      </Descriptions>
    </>
  )
}

export default IntroToNetwork
