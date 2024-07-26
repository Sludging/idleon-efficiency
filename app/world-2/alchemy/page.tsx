import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import Alchemy from "./content";

export const metadata: Metadata = {
    title: "Alchemy",
}

export default function Page() {
    return (
        <Box>
            <Suspense><Alchemy /></Suspense>
        </Box>
    )
}