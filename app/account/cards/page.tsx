import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import CardsDisplay from "./content";

export const metadata: Metadata = {
    title: "Cards",
}

export default function Page() {
    return (
        <Box>
            <Suspense><CardsDisplay /></Suspense>
        </Box>
    )
}