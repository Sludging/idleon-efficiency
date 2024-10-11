import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import Construction from "./content";

export const metadata: Metadata = {
    title: "Construction",
}

export default function Page() {
    return (
        <Box>
            <Suspense><Construction /></Suspense>
        </Box>
    )
}