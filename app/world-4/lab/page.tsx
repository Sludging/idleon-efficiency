import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import Lab from "./content";

export const metadata: Metadata = {
    title: "Lab",
}

export default function Page() {
    return (
        <Box>
            <Suspense><Lab /></Suspense>
        </Box>
    )
}