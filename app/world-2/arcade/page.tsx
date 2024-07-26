import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import Arcade from "./content";

export const metadata: Metadata = {
    title: "Arcade",
}

export default function Page() {
    return (
        <Box>
            <Suspense><Arcade /></Suspense>
        </Box>
    )
}