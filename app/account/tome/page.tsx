import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import TomeDisplay from "./content";

export const metadata: Metadata = {
    title: "Cards",
}

export default function Page() {
    return (
        <Box>
            <Suspense><TomeDisplay /></Suspense>
        </Box>
    )
}