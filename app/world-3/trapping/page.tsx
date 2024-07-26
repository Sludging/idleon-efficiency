import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import Traps from "./content";

export const metadata: Metadata = {
    title: "Traps",
}

export default function Page() {
    return (
        <Box>
            <Suspense><Traps /></Suspense>
        </Box>
    )
}