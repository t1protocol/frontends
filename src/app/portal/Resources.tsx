import { sendGAEvent } from "@next/third-parties/google"

import { Typography } from "@mui/material"

import Link from "@/components/Link"
import { RESOURCES } from "@/constants"

import Descriptions, { DescriptionItem } from "./Descriptions"

const Resources = () => {
  return (
    <Descriptions title="Resources">
      {RESOURCES.map(item => (
        <DescriptionItem key={item.name} odd>
          <Link
            underline="hover"
            external={item.isExternal}
            href={item.subdomainOrPath}
            onClick={() => {
              sendGAEvent("resource_link_clicked", {
                resource_name: item.name,
                resource_url: item.subdomainOrPath,
                is_external: item.isExternal,
              })
            }}
          >
            {item.name}
          </Link>
          {item.descriptionJSX ? item.descriptionJSX : <Typography sx={{ width: ["100%", "60rem"] }}>{item.description}</Typography>}
        </DescriptionItem>
      ))}
    </Descriptions>
  )
}

export default Resources
