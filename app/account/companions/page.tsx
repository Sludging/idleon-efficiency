import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import CompanionDisplay from "./content";

export const metadata: Metadata = {
    title: "Companions",
}

export default function Page() {
    return (
        <Box>
            <Suspense><CompanionDisplay /></Suspense>
        </Box>
    )
}