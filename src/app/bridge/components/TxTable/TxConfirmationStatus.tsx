import { makeStyles } from "tss-react/mui"

import { Chip, Tooltip } from "@mui/material"

import { TX_STATUS } from "@/constants"

import ActiveButton from "./ActiveButton"

const useStyles = makeStyles()(theme => {
  return {
    chip: {
      width: "15rem",
      height: "4rem",
      fontSize: "1.4rem",
      fontWeight: 600,
      borderRadius: "10rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      ".MuiChip-label": {
        display: "flex",
        alignItems: "center",
      },
    },

    pendingChip: {
      color: "#8C591A",
      backgroundColor: "#FFF8F3",
    },
    successChip: {
      color: "#0F8E7E",
      backgroundColor: "#DFFCF8",
    },
    failedChip: {
      backgroundColor: "#FFE1DB",
      color: "#16B093",
    },
    cancelledChip: {
      color: "#5B5B5B",
      background: "#EDEDED",
    },
    waitingClaimChip: {
      background: "#FFF8F3",
      color: "#8C591A",
    },
    claimButton: {
      borderRadius: "0.5rem",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    pagination: {
      ".MuiPaginationItem-text": {
        fontSize: "1.6rem",
      },
      ".MuiPaginationItem-root": {
        color: theme.palette.text.primary,
      },
      ".MuiPaginationItem-root.Mui-selected": {
        fontWeight: 700,
        backgroundColor: "unset",
      },
      ".MuiSvgIcon-root": {
        fontSize: "2.4rem",
      },
    },
  }
})

const TxConfirmationStatus = props => {
  const { tx } = props
  const { classes, cx } = useStyles()

  if ([TX_STATUS.Dropped, TX_STATUS.SentFailed, TX_STATUS.Skipped, TX_STATUS.BatchDepositFailed].includes(tx.txStatus)) {
    return (
      <Tooltip placement="top" title="Please click on the transaction hash to view the error reason.">
        <Chip
          className={cx(classes.chip, classes.failedChip)}
          label={
            <>
              <span>Failed</span>
            </>
          }
        ></Chip>
      </Tooltip>
    )
  }

  if (tx.txStatus === TX_STATUS.Sent || tx.txStatus === TX_STATUS.BatchDepositSent) {
    return <Chip className={cx(classes.chip, classes.successChip)} label="Confirmed"></Chip>
  }

  if (tx.txStatus === TX_STATUS.RelayedReverted || tx.txStatus === TX_STATUS.FailedRelayed) {
    return <ActiveButton type="Retry" tx={tx} />
  }

  return <Chip label="Pending" className={cx(classes.chip, classes.pendingChip)}></Chip>
}

export default TxConfirmationStatus
