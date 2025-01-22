import { genMeta } from "@/utils"

import Header from "./_components/Header"

// import Blog from "./_components/Blog"
// import BuildWithScroll from "./_components/BuildWithScroll"
// import ExploreEcosystem from "./_components/ExploreEcosystem"
// import StartBuilding from "./_components/StartBuilding"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Bridging",
}))

const LandingPage = () => {
  return (
    <>
      <Header />
      {/* <BuildWithScroll />
      <ExploreEcosystem />
      <Blog />
      <StartBuilding /> */}
    </>
  )
}

export default LandingPage
