import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import Stamps from "./content";

export const metadata: Metadata = {
    title: "Stamps",
}

export default function Page() {
    return (
        <Box>
            <Suspense><Stamps /></Suspense>
        </Box>
    )
}