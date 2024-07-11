import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import Divinity from "./content";

export const metadata: Metadata = {
    title: "Divinity",
}

export default function Page() {
    return (
        <Box>
            <Suspense><Divinity /></Suspense>
        </Box>
    )
}