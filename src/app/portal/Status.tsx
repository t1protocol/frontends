import { sendGAEvent } from "@next/third-parties/google"

import { Typography } from "@mui/material"

import Link from "@/components/Link"
import { STATUS_PAGE } from "@/constants"

import Descriptions, { DescriptionItem } from "./Descriptions"

const Status = () => {
  return (
    <Descriptions title="Status">
      {STATUS_PAGE.map(item => (
        <DescriptionItem key={item.name} odd alignTop>
          <Link
            underline="hover"
            external={item.isExternal}
            href={item.subdomainOrPath}
            onClick={() => {
              sendGAEvent("test_flow_link_clicked", {
                resource_name: item.name,
                resource_url: item.subdomainOrPath,
                is_external: item.isExternal,
              })
            }}
          >
            {item?.nameJSX ? item.nameJSX : item.name}
          </Link>
          {item.descriptionJSX ? item.descriptionJSX : <Typography sx={{ width: ["100%", "60rem"] }}>{item.description}</Typography>}
        </DescriptionItem>
      ))}
    </Descriptions>
  )
}

export default Status
