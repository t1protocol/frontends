import Link from "next/link"

import { Stack, SvgIcon } from "@mui/material"
import { styled } from "@mui/system"

import LinkSvg from "@/assets/svgs/common/external-link.svg"
import { isMainnet } from "@/utils"

const FAQsLink = styled(Link)(() => ({
  color: "#6D6D6D",
  fontSize: "1.4rem",
  fontWeight: 600,
  textDecoration: "underline",
  svg: {
    marginLeft: "0.2rem",
    fontSize: "0.8rem",
  },
}))

const BridgeLinks = () => {
  return (
    <Stack direction="row" justifyContent="center" alignItems="center" spacing="2rem" sx={{ width: "100%", marginTop: "1rem" }}>
      <FAQsLink href="/bridge/faq">
        FAQs
        <SvgIcon component={LinkSvg} inheritViewBox></SvgIcon>
      </FAQsLink>
      {isMainnet && (
        <FAQsLink target="_blank" href="/bridge">
          {process.env.NEXT_PUBLIC_T1_ENVIRONMENT} Bridge
          <SvgIcon component={LinkSvg} inheritViewBox></SvgIcon>
        </FAQsLink>
      )}
      {/* <FAQsLink href="/terms-of-service">
        Terms of Service
        <SvgIcon component={LinkSvg} inheritViewBox></SvgIcon>
      </FAQsLink> */}
    </Stack>
  )
}

export default BridgeLinks
