"use client"

import { ReactNode, useState } from "react"

import { Alert, Typography as MuiTypography, Snackbar, Stack } from "@mui/material"
import { TypographyProps as MuiTypographyProps } from "@mui/material/Typography"
import { styled } from "@mui/material/styles"

import Link from "@/components/Link"
import TextButton from "@/components/TextButton"
import { CHAIN_ID, NETWORKS, RPC_URL } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import { isMainnet, switchNetwork } from "@/utils"

import Descriptions, { DescriptionItem } from "./Descriptions"

interface TypographyProps extends MuiTypographyProps {
  bold?: boolean
  primary?: boolean
}

const AddNetworkButton = props => {
  const { chainId, onReadd } = props

  const { walletName: _, chainId: currentChainId } = useRainbowContext()

  const addToWallet = async () => {
    if (currentChainId === chainId) {
      onReadd()
      return
    }
    await switchNetwork(chainId)
  }

  return <TextButton onClick={addToWallet}>Add to Wallet</TextButton>
}

const truncateUrl = (url: string): string => {
  return url.replace(/^https?:\/+/, "").slice(0, 14) + "..."
}

const Typography = styled(MuiTypography, {
  shouldForwardProp: prop => prop !== "bold" && prop !== "primary",
})<TypographyProps>(({ theme, bold, primary }) => ({
  fontWeight: bold ? 600 : 400,
  color: primary ? (theme as any).vars.palette.primary.main : (theme as any).vars.palette.text.primary,
}))

const WalletConfig = () => {
  const { walletName, chainId, connect } = useRainbowContext()
  const [tip, setTip] = useState<ReactNode | null>(null)
  const { isMobile } = useCheckViewport()

  const handleReadd = () => {
    chainId &&
      setTip(
        <>
          You are already on <b>{NETWORKS.find(item => item.chainId === chainId)!.name}</b>.
        </>,
      )
  }

  const handleClose = () => {
    setTip(null)
  }

  const copyRpcUrl = async () => {
    await navigator.clipboard.writeText(RPC_URL.L2)
    setTip(
      <>
        RPC URL copied: <b>{RPC_URL.L2}</b>
      </>,
    )
  }

  const copyChainIdL2 = async () => {
    await navigator.clipboard.writeText(CHAIN_ID.L2.toString())
    setTip(
      <>
        Chain ID copied: <b>{CHAIN_ID.L2}</b>
      </>,
    )
  }

  return (
    <>
      <Descriptions title={`Get set up on ${isMainnet ? "𝚝𝟷 mainnet" : `𝚝𝟷 ${process.env.NEXT_PUBLIC_T1_ENVIRONMENT.toLowerCase()}`}`}>
        {NETWORKS.map((item, index) => (
          <DescriptionItem key={item.name}>
            <Typography bold>Layer{index + 1}</Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ width: ["100%", "60rem"], border: "1px solid #DADADA", borderRadius: "10rem", p: ["1.2rem 1.6rem", "1.2rem 2.2rem"] }}
            >
              <Typography>{item.name}</Typography>
              {walletName ? (
                <AddNetworkButton chainId={item.chainId} onReadd={handleReadd} />
              ) : (
                <TextButton onClick={connect}>Connect Wallet</TextButton>
              )}
            </Stack>
          </DescriptionItem>
        ))}
        <DescriptionItem>
          <Typography bold></Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ width: ["100%", "60rem"], border: "1px solid #DADADA", borderRadius: "10rem", p: ["1.2rem 1.6rem", "1.2rem 2.2rem"] }}
          >
            <Typography>{isMobile ? truncateUrl(RPC_URL.L2) : RPC_URL.L2}</Typography>
            <Typography>
              <TextButton onClick={copyRpcUrl}>Copy RPC URL</TextButton>
            </Typography>
          </Stack>
        </DescriptionItem>
        <DescriptionItem>
          <Typography bold></Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ width: ["100%", "60rem"], border: "1px solid #DADADA", borderRadius: "10rem", p: ["1.2rem 1.6rem", "1.2rem 2.2rem"] }}
          >
            <Typography>{CHAIN_ID.L2}</Typography>
            <Typography>
              <TextButton onClick={copyChainIdL2}>Copy Chain ID</TextButton>
            </Typography>
          </Stack>
        </DescriptionItem>
        <DescriptionItem>
          <Typography>
            Having issues? Try completely removing previous 𝚝𝟷 networks from your {walletName || "wallet"}. Check the{" "}
            <Link href="/bridge/faq" underline="hover">
              FAQ
            </Link>{" "}
            for other common errors.
          </Typography>
        </DescriptionItem>
      </Descriptions>
      <Snackbar open={!!tip} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="info" onClose={handleClose}>
          {tip}
        </Alert>
      </Snackbar>
    </>
  )
}

export default WalletConfig
