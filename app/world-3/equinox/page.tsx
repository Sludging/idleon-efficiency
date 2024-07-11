import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import Equinox from "./content";

export const metadata: Metadata = {
    title: "Equinox",
}

export default function Page() {
    return (
        <Box>
            <Suspense><Equinox /></Suspense>
        </Box>
    )
}