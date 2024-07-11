import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import DungeonsDisplay from "./content";

export const metadata: Metadata = {
    title: "Dungeons",
}

export default function Page() {
    return (
        <Box>
            <Suspense><DungeonsDisplay /></Suspense>
        </Box>
    )
}