import { sendGAEvent } from "@next/third-parties/google"

import { Typography } from "@mui/material"

import Link from "@/components/Link"
import { TEST_NAVIGATIONS } from "@/constants"

import Descriptions, { DescriptionItem } from "./Descriptions"

const TestFlow = () => {
  return (
    <Descriptions title="Test the following">
      {TEST_NAVIGATIONS.map(item => (
        <DescriptionItem key={item.name} odd>
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
            {item.name}
          </Link>
          <Typography sx={{ width: ["100%", "60rem"] }}>{item.description}</Typography>
        </DescriptionItem>
      ))}
    </Descriptions>
  )
}

export default TestFlow
