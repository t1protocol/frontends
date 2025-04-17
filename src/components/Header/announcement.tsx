import { usePathname } from "next/navigation"
import { useMemo } from "react"
import Marquee from "react-fast-marquee"

import { Box } from "@mui/material"

const Announcement = () => {
  const displayAnnouncement = true
  const pathname = usePathname()

  const announcementContent = useMemo(() => {
    return (
      <>
        Degraded performance due to high volume <div className="inline-block w-[5px] h-[5px] rounded-full bg-current mx-[20px] align-middle"></div>
        Check status here
        <div className="inline-block w-[5px] h-[5px] rounded-full bg-current mx-[20px] align-middle"></div>
      </>
    )
  }, [])

  const rightHref = useMemo(() => {
    return "https://t1protocol.statuspage.io/"
  }, [])

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
