import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import Gaming from "./content";

export const metadata: Metadata = {
    title: "Gaming",
}

export default function Page() {
    return (
        <Box>
            <Suspense><Gaming /></Suspense>
        </Box>
    )
}