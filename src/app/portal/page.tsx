"use client"

import { useMemo } from "react"

import { Box, Container, Stack, Typography } from "@mui/material"

import { L2_NAME } from "@/constants"

import IntroToNetwork from "./IntroToNetwork"
import SendFeedback from "./SendFeedback"
import TestFlow from "./TestFlow"
import WalletConfig from "./WalletConfig"

const Portal = () => {
  const version = useMemo(() => {
    return process.env.NEXT_PUBLIC_CHAIN_VERSION
  }, [])
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
        <SendFeedback></SendFeedback>
        <Box sx={{ textAlign: "center", mt: "1rem", pb: "1rem" }}>
          <Typography variant="body2" color="textSecondary">
            version: {version}
          </Typography>
        </Box>
      </Stack>
    </Container>
  )
}

export default Portal
