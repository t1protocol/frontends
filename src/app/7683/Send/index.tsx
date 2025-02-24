import { makeStyles } from "tss-react/mui"

import { Box } from "@mui/material"

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

  return (
    <Box className={classes.sendWrapper}>
      <OrderEncoder />
    </Box>
  )
}

export default Send
