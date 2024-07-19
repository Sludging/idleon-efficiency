import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import RawData from "./content";

export const revalidate = 604800;

export const metadata: Metadata = {
    title: "Raw Data",
}

export default function Page() {
    return (
        <Box>
            <Suspense><RawData /></Suspense>
        </Box>
    )
}