import { SvgIcon } from "@mui/material"

import ScrollLogoLightIcon from "@/assets/svgs/common/t1-dark.svg"
import ScrollLogoIcon from "@/assets/svgs/common/t1-dark.svg"

const ScrollLogo = props => {
  const { light, small, ...restProps } = props
  return (
    <SvgIcon
      sx={{ fontSize: small ? "5.5rem" : "8rem", height: "auto", verticalAlign: "middle" }}
      component={light ? ScrollLogoLightIcon : ScrollLogoIcon}
      inheritViewBox
      {...restProps}
    ></SvgIcon>
  )
}

export default ScrollLogo
