import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import StorageDisplay from "./content";

export const metadata: Metadata = {
    title: "Storage",
}

export default function Page() {
    return (
        <Box>
            <Suspense><StorageDisplay /></Suspense>
        </Box>
    )
}