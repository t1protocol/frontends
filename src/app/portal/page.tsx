"use client"

import { useMemo } from "react"

import { Box, Container, Stack, Typography } from "@mui/material"

import { L2_NAME } from "@/constants"

import IntroToNetwork from "./IntroToNetwork"
import Resources from "./Resources"
import SendFeedback from "./SendFeedback"
import TestFlow from "./TestFlow"
import WalletConfig from "./WalletConfig"

const BuildInfo = () => {
  const buildId = process.env.NEXT_PUBLIC_BUILD_ID && process.env.NEXT_PUBLIC_BUILD_ID !== "" ? process.env.NEXT_PUBLIC_BUILD_ID : "N/A"
  const version =
    process.env.NEXT_PUBLIC_CHAIN_VERSION && process.env.NEXT_PUBLIC_CHAIN_VERSION !== "" ? process.env.NEXT_PUBLIC_CHAIN_VERSION : "N/A"
  return (
    <div
      className="build-info-badge"
      style={{
        padding: "4px 8px",
        fontSize: "0.75rem",
        opacity: 0.85,
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        borderRadius: "4px",
        background: "#f0f0f0",
        fontFamily: "monospace",
        userSelect: "all",
        cursor: "default",
      }}
    >
      <Typography variant="body2" color="textSecondary">
        build <span>{buildId}</span> for version: {version}
      </Typography>
    </div>
  )
}

const Portal = () => {
  return (
    <Container>
      <Box sx={{ textAlign: "center", mt: ["6.8rem", "13.8rem"] }}>
        <Typography sx={{ fontSize: ["4rem", "7.8rem"], lineHeight: 1, fontWeight: 500 }}>{L2_NAME}</Typography>
        <Typography sx={{ fontSize: ["2.3rem", "2.6rem"], mt: ["2rem", "1.4rem"] }}>
          Experience face-melting <img src="/imgs/rollup/jet.webp" alt="Jet engine GIF" className="responsive-image" /> withdrawal speeds{" "}
          <img src="/imgs/rollup/superman.webp" alt="Superman GIF" className="responsive-image" />
        </Typography>
      </Box>
      <Stack
        direction="column"
        alignItems="center"
        sx={{
          gap: ["4rem", "6rem"],
          mt: ["8rem", "12rem"],
          pb: ["12rem", "14rem"],
          maxWidth: ["100%", "1036px"],
          px: "0",
          margin: "0 auto",
          "& *": {
            fontFamily: "var(--developer-page-font-family) !important",
          },
        }}
      >
        <IntroToNetwork></IntroToNetwork>
        <WalletConfig></WalletConfig>
        <TestFlow></TestFlow>
        <Resources></Resources>
        <SendFeedback></SendFeedback>
        <BuildInfo></BuildInfo>
      </Stack>
    </Container>
  )
}

export default Portal
