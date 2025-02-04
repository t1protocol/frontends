import { motion } from "framer-motion"
import { isNumber } from "lodash"
import useSWR from "swr"
import { makeStyles } from "tss-react/mui"

import { Box, Divider, Skeleton, Stack, SvgIcon, Tooltip, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import { fetchCurrentWalletPointsUrl, fetchPastWalletPointsUrl } from "@/apis/sessions"
import QaSvg from "@/assets/svgs/sessions/qa.svg"
import Button from "@/components/Button"
import Link from "@/components/Link"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import useSessionsStore from "@/stores/sessionsStore"
import { commafy, formatLargeNumber, sentryDebug } from "@/utils"

const MARKS_FOR_TOKEN = 200

const SESSION_AIRDROP_LINK = "/blog/introducing-scrolls-first-airdrop-a-celebration-of-the-global-community"
const SESSION_2_LINK = "/blog/announcing-scrolls-largest-rewards-program-to-date"

const useStyles = makeStyles()(theme => ({
  tooltip: {
    background: "linear-gradient(180deg, #262626 0%, #111 100%)",
    padding: "1.2rem 1.4rem",
    fontSize: "1.8rem",
    lineHeight: "2.4rem",
    fontFamily: "var(--developer-page-font-family)",
  },
  notEnoughTooltip: {
    backgroundColor: "#111",
    padding: "1.6rem",
    maxWidth: "35rem",
    fontSize: "1.8rem",
    lineHeight: "2.8rem",
    borderRadius: "2rem",
    fontWeight: 400,
  },
  notEnoughArrow: {
    color: "#111",
  },
}))
const StatisticSkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: "1rem",
  width: "12rem",
  height: "8rem",
  display: "inline-block",
}))

const MotionBox = motion(Box)

const TotalPoints = () => {
  const { classes } = useStyles()

  const { walletCurrentAddress, connect } = useRainbowContext()
  const { isMobile, isPortrait } = useCheckViewport()

  const { hasSignedTerms, changeSignatureRequestVisible } = useSessionsStore()

  const { data: currentMarks, isLoading: isCurrentLoading } = useSWR(
    [fetchCurrentWalletPointsUrl(walletCurrentAddress), walletCurrentAddress, hasSignedTerms],
    async ([url, walletAddress, signed]) => {
      try {
        if (!walletAddress || !signed) {
          throw new Error("Wallet address or signed terms missing.")
        }

        const data = await scrollRequest(url)
        const points = data[0].points

        return points
      } catch (e) {
        sentryDebug(`total current marks: ${walletCurrentAddress}-${e.message}`)
        return null
      }
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  const { data: pastMarks, isLoading: isPastLoading } = useSWR(
    [fetchPastWalletPointsUrl(walletCurrentAddress), walletCurrentAddress, hasSignedTerms],
    async ([url, walletAddress, signed]) => {
      try {
        if (!walletAddress || !signed) {
          throw new Error("Wallet address or signed terms missing.")
        }

        const data = await scrollRequest(url)
        const points = data[0].points

        return points
      } catch (e) {
        sentryDebug(`total past marks: ${walletCurrentAddress}-${e.message}`)
        return null
      }
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  return (
    <MotionBox
      sx={[
        {
          width: ["100%", "100%", "62.4rem"],
          height: ["auto", "auto", "22.8rem"],
          padding: ["2.4rem 1.2rem", "2.4rem"],
          background: "#EAF1F1",
          borderRadius: "1.6rem",
          margin: "0 auto",
          position: ["relative", "relative", "absolute"],
          zIndex: 1,
          top: [0, 0, `calc(11.5vw + 10rem)`],
          left: [0, 0, "50%"],
          ml: ["auto", "auto", "-29.7rem"],
          mb: ["1.6rem", "2.4rem", 0],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      ]}
      initial={isPortrait ? {} : { opacity: 0, y: 30, scale: 0.9 }}
      animate={isPortrait ? {} : { opacity: 1, y: 0, scale: 1 }}
      transition={isPortrait ? {} : { duration: 0.5, delay: 1.3 }}
    >
      {walletCurrentAddress && hasSignedTerms && (
        <Stack
          direction={isMobile ? "column-reverse" : "row"}
          sx={{ gap: ["3.2rem", "2.4rem"], textAlign: "center", width: "100%", justifyContent: "space-evenly" }}
        >
          <Stack direction="column" alignItems="center" spacing="0.8rem">
            <Typography sx={{ fontSize: "1.8rem", lineHeight: "2.8rem", fontWeight: 600 }}>Session 0 & 1 Marks</Typography>

            <Tooltip
              disableHoverListener={!pastMarks}
              title={pastMarks ? commafy(pastMarks) : "--"}
              followCursor
              classes={{ tooltip: classes.tooltip }}
            >
              <Typography
                sx={{
                  fontSize: ["4rem", "5.6rem"],
                  lineHeight: ["4.8rem", "8rem"],
                  fontWeight: 600,
                  fontFamily: "var(--developer-page-font-family)",
                }}
              >
                {isPastLoading ? <StatisticSkeleton></StatisticSkeleton> : <>{isNumber(pastMarks) ? formatLargeNumber(pastMarks, 2) : "--"}</>}
              </Typography>
            </Tooltip>

            <Typography sx={{ fontSize: ["1.4rem", "1.6rem"], lineHeight: ["2rem", "2.4rem"], fontFamily: "var(--developer-page-font-family)" }}>
              Cutoff: Oct 19, 2024, 00:00 UTC
            </Typography>
            <Stack direction="row" alignItems="center" spacing="4px">
              {pastMarks < MARKS_FOR_TOKEN ? (
                <>
                  <Typography
                    sx={{ fontSize: ["1.4rem", "1.6rem"], lineHeight: ["2rem", "2.4rem"], fontFamily: "var(--developer-page-font-family)" }}
                  >
                    Marks carried over to Session 2
                  </Typography>
                  <Tooltip
                    classes={{ tooltip: classes.notEnoughTooltip, arrow: classes.notEnoughArrow }}
                    arrow
                    title={
                      <>
                        Marks below the 200 threshold are carried over to Session 2.{" "}
                        <Link underline="always" href={SESSION_AIRDROP_LINK} className="text-inherit text-same-size !font-normal whitespace-nowrap">
                          Learn more
                        </Link>
                      </>
                    }
                  >
                    <span>
                      <SvgIcon component={QaSvg} sx={{ fontSize: "1.6rem" }} inheritViewBox></SvgIcon>
                    </span>
                  </Tooltip>
                </>
              ) : (
                <>
                  <Typography
                    sx={{ fontSize: ["1.4rem", "1.6rem"], lineHeight: ["2rem", "2.4rem"], fontFamily: "var(--developer-page-font-family)" }}
                  >
                    Check eligibility{" "}
                    <Link underline="always" href={SESSION_AIRDROP_LINK} className="text-inherit text-same-size !font-normal whitespace-nowrap">
                      here
                    </Link>
                  </Typography>
                </>
              )}
            </Stack>
          </Stack>
          <Divider orientation={isMobile ? "horizontal" : "vertical"} flexItem></Divider>
          <Stack direction="column" alignItems="center" spacing="0.8rem">
            <Typography sx={{ fontSize: "1.8rem", lineHeight: "2.8rem", fontWeight: 600 }}>Session 2 Marks</Typography>
            <Tooltip
              disableHoverListener={!currentMarks}
              title={currentMarks ? commafy(currentMarks) : "--"}
              followCursor
              classes={{ tooltip: classes.tooltip }}
            >
              <Typography
                sx={{
                  fontSize: ["4rem", "5.6rem"],
                  lineHeight: ["4.8rem", "8rem"],
                  fontWeight: 600,
                  fontFamily: "var(--developer-page-font-family)",
                }}
              >
                {isCurrentLoading ? (
                  <StatisticSkeleton></StatisticSkeleton>
                ) : (
                  <>{isNumber(currentMarks) ? formatLargeNumber(currentMarks, 2) : "--"}</>
                )}
              </Typography>
            </Tooltip>
            <Typography sx={{ fontSize: ["1.4rem", "1.6rem"], lineHeight: ["2rem", "2.4rem"], fontFamily: "var(--developer-page-font-family)" }}>
              Marks are updated every 24 hours
            </Typography>
            <Typography sx={{ fontSize: ["1.4rem", "1.6rem"], lineHeight: ["2rem", "2.4rem"], fontFamily: "var(--developer-page-font-family)" }}>
              Keep engaging in this{" "}
              <Link underline="always" href={SESSION_2_LINK} className="text-inherit text-same-size !font-normal whitespace-nowrap">
                new phase
              </Link>
            </Typography>
          </Stack>
        </Stack>
      )}

      {!walletCurrentAddress && (
        <Stack direction="column" sx={{ gap: "1.6rem" }} justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontSize: ["1.8rem", "2.4rem"], lineHeight: ["2.4rem", "3.6rem"], fontWeight: 600 }}>Your Marks</Typography>
          <Typography
            sx={{ fontSize: ["4rem", "5.6rem"], lineHeight: ["2rem", "2.8rem"], fontWeight: 600, fontFamily: "var(--developer-page-font-family)" }}
          >
            --
          </Typography>
          <Button color="primary" whiteButton onClick={connect}>
            Connect Wallet
          </Button>
        </Stack>
      )}

      {walletCurrentAddress && !hasSignedTerms && (
        <Stack direction="column" sx={{ gap: "1.6rem" }} justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontSize: ["1.8rem", "2.4rem"], lineHeight: ["2.4rem", "3.6rem"], fontWeight: 600 }}>Your Marks</Typography>
          <Typography sx={{ fontSize: ["1.4rem", "1.6rem"], lineHeight: ["2rem", "2.8rem"], textAlign: "center" }}>
            You need to agree to Scroll Sessions Terms of Use to see your Marks and details
          </Typography>
          <Button color="primary" whiteButton onClick={() => changeSignatureRequestVisible(true)} width={isMobile ? "100%" : "32.2rem"}>
            View terms of use
          </Button>
        </Stack>
      )}
    </MotionBox>
  )
}

export default TotalPoints
