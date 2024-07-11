import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import Summoning from "./content";

export const metadata: Metadata = {
    title: "Summoning",
}

export default function Page() {
    return (
        <Box>
            <Suspense><Summoning /></Suspense>
        </Box>
    )
}