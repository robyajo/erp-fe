import { Metadata } from "next"

import ViewPageSettings from "./_components/v-page"

export const metadata: Metadata = {
  title: "Settings",
  description: "Settings",
}

export default function page() {
  return (
    <>
      <ViewPageSettings />
    </>
  )
}
