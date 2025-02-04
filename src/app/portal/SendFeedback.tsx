"use client"

import { Stack, SvgIcon, Typography } from "@mui/material"

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
          <Link external underline="hover" href="https://discord.com/invite/nbvyXZHgke">
            Discord
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
