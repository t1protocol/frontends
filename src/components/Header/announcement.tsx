import { usePathname } from "next/navigation"
import { useMemo } from "react"
import Marquee from "react-fast-marquee"

import { Box } from "@mui/material"

const Announcement = () => {
  const displayAnnouncement = true
  const pathname = usePathname()
  const isHome = pathname === "/"

  const announcementContent = useMemo(() => {
    if (isHome) {
      return (
        <>
          Hack on 𝚝𝟷 as part of ETHGlobal Trifecta this weekend{" "}
          <div className="inline-block w-[5px] h-[5px] rounded-full bg-current mx-[20px] align-middle"></div>
          20 March - 23 March
          <div className="inline-block w-[5px] h-[5px] rounded-full bg-current mx-[20px] align-middle"></div>
        </>
      )
    }
    return null
  }, [isHome])

  const rightHref = useMemo(() => {
    if (isHome) {
      return "https://x.com/t1protocol/status/1901966613680689163"
    }
    return ""
  }, [isHome])

  return displayAnnouncement && announcementContent ? (
    <a href={rightHref} target="_blank" rel="noopener noreferrer" className="mb-[1.6rem]">
      <Box
        sx={{
          backgroundColor: theme => theme.palette.primary.main,
          color: theme => theme.palette.primary.contrastText,
          fontSize: "1.6rem",
          lineHeight: {
            xs: "2rem",
            sm: "2.6rem",
          },
          padding: "1.6rem",
          width: "100%",
          borderBottom: "1px solid #101010",
          fontWeight: "500",
        }}
      >
        <Marquee autoFill pauseOnHover gradient={false}>
          {announcementContent}
        </Marquee>
      </Box>
    </a>
  ) : null
}

export default Announcement
