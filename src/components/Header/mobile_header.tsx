import { sendGAEvent } from "@next/third-parties/google"
import React, { useEffect, useState } from "react"
import { useStyles } from "tss-react/mui"

import { ExpandMore } from "@mui/icons-material"
import { Box, Collapse, List, ListItemButton, Stack, Typography } from "@mui/material"
import { styled } from "@mui/system"

import LanguageSelect from "@/components/LanguageSelect"
import Link from "@/components/Link"
import WalletToolkit from "@/components/WalletToolkit"
import useShowLanguageSelect from "@/hooks/useShowLanguageSelect"
import useShowWalletConnector from "@/hooks/useShowWalletToolkit"

import Logo from "../ScrollLogo"
import SubmenuLink from "./SubmenuLink"
import Announcement from "./announcement"
import { navigations } from "./constants"
import useCheckCustomNavBarBg from "./useCheckCustomNavBarBg"
import useCheckTheme from "./useCheckTheme"

const NavStack = styled(Stack)(() => ({
  height: "3rem",
  lineHeight: "3rem",
  margin: "1.6rem",
}))

const Menu = styled("div")(() => ({
  display: "inline-block",
  [`&.active > div:nth-of-type(1)`]: {
    transform: "rotate(45deg) translate(5px, 5px)",
  },
  [`&.active > div:nth-of-type(2)`]: {
    opacity: 0,
  },
  [`&.active > div:nth-of-type(3)`]: {
    transform: "rotate(-45deg) translate(5px, -5px)",
  },
}))

const Bar = styled<any>("div", { shouldForwardProp: prop => prop !== "dark" })(({ theme, dark }) => ({
  width: "2rem",
  height: ".2rem",
  backgroundColor: dark ? (theme as any).vars.palette.primary.contrastText : (theme as any).vars.palette.text.primary,
  margin: " 5px 0",
  transition: "0.4s",
}))

const MenuContent = styled<any>(Box, { shouldForwardProp: prop => prop !== "dark" })(({ theme, dark }) => ({
  margin: "0.5rem 1.6rem 0",
  background: dark ? (theme as any).vars.palette.themeBackground.dark : (theme as any).vars.palette.themeBackground.light,
}))

const ListItem = styled<any>(ListItemButton, { shouldForwardProp: prop => prop !== "dark" })(({ theme, dark }) => ({
  fontWeight: 600,
  fontSize: "2rem",
  height: "5.5rem",
  lineHeight: "5.5rem",
  color: dark ? (theme as any).vars.palette.primary.contrastText : (theme as any).vars.palette.text.primary,
  margin: "0",
  display: "flex",
  justifyContent: "space-between",
  padding: "0 !important",
  "&.active": {},
  "&:hover": {
    background: "transparent",
  },
  "&:not(:first-of-type)": {
    borderTop: `1px solid ${dark ? (theme as any).vars.palette.primary.contrastText : (theme as any).vars.palette.text.primary}`,
  },
}))

const MenuItemLink = styled<any>(Link, { shouldForwardProp: prop => prop !== "dark" })(({ theme, dark }) => ({
  fontWeight: 600,
  fontSize: "2rem",
  height: "5.5rem",
  lineHeight: "5.5rem",
  color: dark ? (theme as any).vars.palette.primary.contrastText : (theme as any).vars.palette.text.primary,
  width: "100%",
  "&.active": {
    color: (theme as any).vars.palette.primary.main,
  },
}))

const SectionList = styled<any>("div", { shouldForwardProp: prop => prop !== "dark" })(({ theme, dark }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "1.6rem",
  "&:last-of-type": {
    paddingBottom: "2.5rem",
  },
  "&:nth-last-of-type(-n+2)": {
    paddingBottom: "1.6rem",
  },
  "&:nth-of-type(n+2)": {
    borderTop: `1px solid ${dark ? (theme as any).vars.palette.primary.contrastText : (theme as any).vars.palette.text.primary}`,
    paddingTop: "1.6rem",
  },
}))

const ExpandMoreIcon = styled(ExpandMore)(({}) => ({
  transition: "transform 0.3s ease",
  "&.active": {
    transform: "rotate(180deg)",
  },
}))

const MobileHeader = ({ currentMenu }) => {
  const navbarBg = useCheckCustomNavBarBg()
  const showWalletConnector = useShowWalletConnector()
  const showLanguageSelect = useShowLanguageSelect()
  const { cx } = useStyles()

  const dark = useCheckTheme()
  const [open, setOpen] = useState(false)
  const [activeCollapse, setActiveCollapse] = useState("")

  useEffect(() => {
    setActiveCollapse(currentMenu[1])
  }, [currentMenu])

  const toggleDrawer = isOpen => {
    setOpen(isOpen)
    if (isOpen) {
      window.document.body.classList.add("mobile-top-nav-open")
    } else {
      window.document.body.classList.remove("mobile-top-nav-open")
      setActiveCollapse(currentMenu[1])
    }
  }

  const toggleCollapse = collapse => {
    setActiveCollapse(collapse === activeCollapse ? "" : collapse)
  }

  const renderList = () => (
    <List
      sx={{
        padding: "0",
        fontSize: "16px",
      }}
      component="nav"
    >
      {navigations.map(item => (
        <React.Fragment key={item.key}>
          <ListItem dark={dark} className={cx(activeCollapse === item.key && "active")} sx={{ py: "1rem" }} onClick={() => toggleDrawer(false)}>
            <MenuItemLink
              href={item.href}
              dark={dark}
              sx={{ fontSize: "4rem", display: "flex", justifyContent: "center" }}
              className={cx(currentMenu.includes(item.key) && "active")}
              // reloadDocument={item.reload}
              onClick={() =>
                sendGAEvent("event", "click_menu", {
                  label: item.label,
                  device: "mobile",
                })
              }
            >
              {item.label}
            </MenuItemLink>
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  )

  return (
    <Box
      className={open ? "active" : ""}
      sx={{ backgroundColor: navbarBg && !open ? `themeBackground.${navbarBg}` : dark ? "themeBackground.dark" : "themeBackground.light" }}
    >
      {/* <Announcement /> */}
      <NavStack direction="row" justifyContent="space-between" alignItems="center">
        <Link href="/" className="flex">
          <Box onClick={() => toggleDrawer(false)} style={{ display: "flex" }}>
            <Logo light={dark} small />
            <Typography
              style={{
                display: "flex",
                alignItems: "flex-end",
                marginLeft: "0.5rem",
                cursor: "pointer",
                fontSize: "1.5rem",
                fontWeight: 500,
              }}
            >
              Portal
            </Typography>
          </Box>
        </Link>
        <Stack direction="row" spacing="1.6rem" alignItems="center">
          {showWalletConnector && <WalletToolkit dark={dark}></WalletToolkit>}
          {showLanguageSelect && <LanguageSelect></LanguageSelect>}

          <Menu onClick={() => toggleDrawer(!open)} className={open ? "active" : ""}>
            <Bar dark={dark}></Bar>
            <Bar dark={dark}></Bar>
            <Bar dark={dark}></Bar>
          </Menu>
        </Stack>
      </NavStack>
      {open && (
        <Box
          sx={{
            background: theme => (dark ? (theme as any).vars.palette.themeBackground.dark : (theme as any).vars.palette.themeBackground.light),
            height: "calc(100vh - 6.2rem)",
            overflowY: "auto",
          }}
        >
          <MenuContent role="presentation" dark={dark} onKeyDown={() => toggleDrawer(false)}>
            {renderList()}
          </MenuContent>
        </Box>
      )}
    </Box>
  )
}

export default MobileHeader
