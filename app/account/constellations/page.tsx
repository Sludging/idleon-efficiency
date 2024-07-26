import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import Constellations from "./content";

export const metadata: Metadata = {
    title: "Constellations",
}

export default function Page() {
    return (
        <Box>
            <Suspense><Constellations /></Suspense>
        </Box>
    )
}