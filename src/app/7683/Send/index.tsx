import { useEffect } from "react"
import { makeStyles } from "tss-react/mui"

import CloseIcon from "@mui/icons-material/Close"
import { Box, IconButton, Snackbar, Typography } from "@mui/material"

import Alert from "@/components/Alert"
import Link from "@/components/Link"
import { CHAIN_ID, NETWORKS } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useBridgeStore from "@/stores/bridgeStore"
import { generateExploreLink } from "@/utils"

import OrderEncoder from "./OrderEncoder"

const useStyles = makeStyles()(theme => ({
  sendWrapper: {
    borderRadius: "2rem",
    overflow: "hidden",
    maxWidth: "64rem",
    width: "100%",
    "& *": {
      fontFamily: "var(--developer-page-font-family) !important",
    },
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    },
  },
  tabList: {
    width: "100%",
  },
  tab: {
    flex: 1,
    height: "5.6rem",
    fontSize: "2rem",
    fontWeight: 500,
    color: (theme as any).vars.palette.text.primary,
    padding: 0,
    backgroundColor: (theme as any).vars.palette.themeBackground.primary,
    textTransform: "unset",
    "&.Mui-selected": {
      color: (theme as any).vars.palette.text.primary,
      fontWeight: 600,
      backgroundColor: (theme as any).vars.palette.themeBackground.optionHightlight,
    },

    [theme.breakpoints.down("sm")]: {
      width: "50%",
      fontSize: "1.4rem",
    },
  },
  indicator: {
    display: "none",
  },
  tabPanel: {
    backgroundColor: (theme as any).vars.palette.themeBackground.optionHightlight,
    padding: "3rem 5.4rem",
    borderBottomLeftRadius: "1rem",
    borderBottomRightRadius: "1rem",

    "&.withdraw": {
      padding: "1rem 3rem 3rem",
    },

    [theme.breakpoints.down("sm")]: {
      padding: "3rem 2rem 2rem",

      "&.withdraw": {
        padding: "1rem 2rem 2rem",
      },
    },
  },

  snackbar: {
    width: "max-content",
    maxWidth: "calc(100% - 1.6rem)",

    [theme.breakpoints.down("sm")]: {
      left: "50%",
      transform: "translateX(-50%)",
    },
  },

  transactionHistoryWrapper: {
    marginTop: "2rem",
    padding: "2rem",
    borderRadius: "1.2rem",
    backgroundColor: (theme as any).vars.palette.themeBackground.normal,
    marginBottom: "2rem",
    [theme.breakpoints.down("sm")]: {
      padding: "1.5rem",
    },
  },
  transactionTitle: {
    fontSize: "2.4rem",
    fontWeight: 600,
    marginBottom: "1.5rem",
    color: (theme as any).vars.palette.text.primary,
  },
}))

const Send = () => {
  const { classes } = useStyles()
  const { chainId } = useRainbowContext()
  const { txType, txResult, txHash, txIsL1, fromNetwork, withDrawStep, changeTxResult, changeTxHash, changeTxIsL1, changeIsNetworkCorrect } =
    useBridgeStore()

  useEffect(() => {
    let networkCorrect
    if (txType === "Deposit") {
      networkCorrect = fromNetwork.isL1 && chainId === CHAIN_ID.L1
    } else if (withDrawStep === "1") {
      networkCorrect = !fromNetwork.isL1 && chainId === CHAIN_ID.L2
    } else {
      networkCorrect = chainId === CHAIN_ID.L1
    }
    changeIsNetworkCorrect(networkCorrect)
  }, [fromNetwork, txType, withDrawStep, chainId])

  const handleClose = () => {
    changeTxResult(null)
    changeTxHash(null)
    changeTxIsL1(null)
  }

  return (
    <Box className={classes.sendWrapper}>
      <OrderEncoder />

      {/* <Box className={classes.transactionHistoryWrapper}>
        <Typography className={classes.transactionTitle}>Transaction History</Typography>
        <TxHistoryTable />
      </Box> */}

      <Snackbar
        open={!!txResult}
        autoHideDuration={8000}
        classes={{ root: classes.snackbar }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={handleClose}
      >
        <div>
          {txResult?.code === 1 && (
            <Alert
              severity="success"
              action={
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
            >
              <Typography fontWeight="bold">Transaction Confirmed!</Typography>
              <Link href={`${generateExploreLink(NETWORKS[+!txIsL1].explorer, txHash)}`} target="_blank" rel="noopener" underline="always">
                View Transaction
              </Link>
            </Alert>
          )}
          {txResult?.code === 0 && (
            <Alert severity="error" sx={{ maxWidth: "49rem" }}>
              <>
                Failed in submission.
                <br /> {txResult?.message}
              </>
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Alert>
          )}
        </div>
      </Snackbar>
    </Box>
  )
}

export default Send
