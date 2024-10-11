import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import Breeding from "./content";

export const metadata: Metadata = {
    title: "Breeding",
}

export default function Page() {
    return (
        <Box>
            <Suspense><Breeding /></Suspense>
        </Box>
    )
}