"use client"

import { sendGAEvent } from "@next/third-parties/google"

import { Stack, SvgIcon, Typography } from "@mui/material"

import TwitterSvg from "@/assets/svgs/ecosystem/twitter.svg"
import DiscordSvg from "@/assets/svgs/portal/discord.svg"
import GithubSvg from "@/assets/svgs/portal/github.svg"
import StatusSvg from "@/assets/svgs/portal/status.svg"
import Link from "@/components/Link"

import Descriptions, { DescriptionItem } from "./Descriptions"

const SendFeedback = () => {
  const FEEDBACK_LIST = [
    {
      icon: DiscordSvg,
      content: (
        <>
          Chat with us on{" "}
          <Link
            external
            underline="hover"
            href="https://discord.com/invite/nbvyXZHgke"
            onClick={() => {
              sendGAEvent("social_link_clicked", {
                platform: "Discord",
                url: "https://discord.com/invite/nbvyXZHgke",
              })
            }}
          >
            Discord
          </Link>
        </>
      ),
    },
    {
      icon: TwitterSvg,
      content: (
        <>
          Follow us on{" "}
          <Link
            external
            underline="hover"
            href="https://x.com/t1protocol"
            onClick={() => {
              sendGAEvent("social_link_clicked", {
                platform: "X",
                url: "https://x.com/t1protocol",
              })
            }}
          >
            X
          </Link>
        </>
      ),
    },
  ]
  return (
    <Descriptions title="Send us feedback">
      {FEEDBACK_LIST.map((item, index) => (
        <DescriptionItem key={index}>
          <Stack direction="row" spacing="1.2rem" alignItems="center">
            <SvgIcon sx={{ fontSize: ["1.8rem", "2.2rem"] }} component={item.icon} inheritViewBox></SvgIcon>
            <Typography>{item.content}</Typography>
          </Stack>
        </DescriptionItem>
      ))}
    </Descriptions>
  )
}

export default SendFeedback
