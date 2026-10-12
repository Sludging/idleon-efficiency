import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import JellyOperatorContent from "./content";

export const metadata: Metadata = {
    title: "Jelly Operator",
}

export default function Page() {
    return (
        <Box>
            <Suspense><JellyOperatorContent /></Suspense>
        </Box>
    )
}
