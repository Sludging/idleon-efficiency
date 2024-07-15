import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import RiftDisplay from "./content";

export const metadata: Metadata = {
    title: "Rift",
}

export default function Page() {
    return (
        <Box>
            <Suspense><RiftDisplay /></Suspense>
        </Box>
    )
}