import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import Sneaking from "./content";

export const metadata: Metadata = {
    title: "Sneaking",
}

export default function Page() {
    return (
        <Box>
            <Suspense><Sneaking /></Suspense>
        </Box>
    )
}