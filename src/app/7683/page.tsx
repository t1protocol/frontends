"use client"

import { Stack, Typography } from "@mui/material"

import SectionWrapper from "@/components/SectionWrapper"
import { PriceFeeProvider } from "@/contexts/PriceFeeProvider"

import Send from "./Send/index"

const Demo7683 = () => {
  return (
    <PriceFeeProvider>
      <SectionWrapper
        sx={{
          pt: ["4.8rem", "8.4rem"],
          pb: "6rem",
          minHeight: "calc(100vh - 69.2rem)",
          display: "flex",
          flexDirection: "column",
          alignItems: ["flex-start", "center"],
          maxWidth: ["100% !important"],
        }}
      >
        <Stack direction="row" sx={{ mb: "2.4rem", maxWidth: "100%" }} spacing="2rem" justifyContent="space-between" alignItems="center">
          <Typography
            sx={{
              fontSize: ["4rem", "4.8rem"],
              lineHeight: ["4.8rem", "7.2rem"],
              fontWeight: 500,
              width: "100%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            🏕️
          </Typography>
        </Stack>
        <Send></Send>
      </SectionWrapper>
    </PriceFeeProvider>
  )
}

export default Demo7683
