import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import CoralContent from "./content";

export const metadata: Metadata = {
    title: "Coral Reef & Dancing Coral",
}

export default function Page() {
    return (
        <Box>
            <Suspense><CoralContent /></Suspense>
        </Box>
    )
}
