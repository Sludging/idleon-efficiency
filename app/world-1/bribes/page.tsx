import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import Bribes from "./content";

export const metadata: Metadata = {
    title: "Bribes",
}

export default function Page() {
    return (
        <Box>
            <Suspense><Bribes /></Suspense>
        </Box>
    )
}
