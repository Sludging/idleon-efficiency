import { Box } from "grommet";
import { Suspense } from "react";
import Obols from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Obols",
}

export default function Page() {
    return (
        <Box>
            <Suspense><Obols /></Suspense>
        </Box>
    )
}