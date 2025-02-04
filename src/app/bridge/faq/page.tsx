"use client"

import { makeStyles } from "tss-react/mui"

import { Typography } from "@mui/material"

import Faq, { FaqItem } from "@/components/Faq"
import Link from "@/components/Link"
import { SITE_MAP } from "@/constants"

const useStyles = makeStyles()(() => {
  return {
    specialParagraph: {
      marginTop: "2.6rem",
    },
    orderedParagraph: {
      marginLeft: "1.2em",
      textIndent: "-1.2em",
    },
  }
})

const FAQ = () => {
  const { classes } = useStyles()
  return (
    <Faq backUrl="/bridge" backText="< Back to Bridge">
      <FaqItem title="What is a blockchain Bridge?" id="2">
        <Typography variant="Body3" color="textSecondary">
          All blockchains are developed in isolated environments, this means they cannot natively communicate and tokens cannot move freely between
          blockchains.
        </Typography>
        <Typography variant="Body3" color="textSecondary" className={classes.specialParagraph}>
          A blockchain bridge is a tool that connects two blockchains to enable interactions and move assets between them.
        </Typography>
      </FaqItem>
      <FaqItem title="How to send tokens using the Bridge?" id="3">
        <Typography variant="Body3" color="textSecondary" className={classes.orderedParagraph}>
          1. Switch to the correct network in your wallet. (If you are a first time 𝚝𝟷 user, you will need to add the 𝚝𝟷 network to your wallet. Add
          network <Link href={SITE_MAP.Home}>here</Link>.)
        </Typography>
        <Typography variant="Body3" color="textSecondary" className={classes.orderedParagraph}>
          2. Select Deposit or Withdraw on the bridge.
        </Typography>
        <Typography variant="Body3" color="textSecondary" className={classes.orderedParagraph}>
          3. Select the token (for ex. ETH) you wish to transfer. Currently, only ETH is supported for bridging. Support for ERC20 tokens will be
          added in the future.
        </Typography>
        <Typography variant="Body3" color="textSecondary" className={classes.orderedParagraph}>
          4. Click on Deposit funds/Withdraw funds. A pop up window form will ask you for the transfer confirmation. You will be prompted to approve
          the 𝚝𝟷 Bridge contract to access your ETH token. Ensure you have enough ETH to cover gas fees during the bridging process.
        </Typography>
        <Typography variant="Body3" color="textSecondary" className={classes.orderedParagraph}>
          5. Once the transaction is confirmed, the token will be deducted from your wallet.
        </Typography>
      </FaqItem>
    </Faq>
  )
}

export default FAQ
