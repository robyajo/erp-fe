import { Metadata } from "next"

import ViewPagePlugins from "./_components/v-page"

export const metadata: Metadata = {
  title: "Plugins",
  description: "Plugins",
}

export default function page() {
  return (
    <>
      <ViewPagePlugins />
    </>
  )
}
