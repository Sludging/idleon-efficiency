import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import Slab from "./content";

export const metadata: Metadata = {
    title: "Slab",
}

export default function Page() {
    return (
        <Box>
            <Suspense><Slab /></Suspense>
        </Box>
    )
}