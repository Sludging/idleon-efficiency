import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import Farming from "./content";

export const metadata: Metadata = {
    title: "Farming",
}

export default function Page() {
    return (
        <Box>
            <Suspense><Farming /></Suspense>
        </Box>
    )
}