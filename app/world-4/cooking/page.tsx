import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import Cooking from "./content";

export const metadata: Metadata = {
    title: "Cooking",
}

export default function Page() {
    return (
        <Box>
            <Suspense><Cooking /></Suspense>
        </Box>
    )
}