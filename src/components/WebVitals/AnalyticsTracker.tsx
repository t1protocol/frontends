"use client"

import { sendGAEvent } from "@next/third-parties/google"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    sendGAEvent("page_view", {
      page_path: pathname,
      page_title: document.title,
    })
  }, [pathname])

  return null // This component doesn't render anything
}
