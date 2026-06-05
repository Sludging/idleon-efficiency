import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import ProfileSettings from "./content";

export const metadata: Metadata = {
    title: "User Profile - Settings",
}

export default function Page() {
    return (
        <Box>
            <Suspense><ProfileSettings /></Suspense>
        </Box>
    )
}
