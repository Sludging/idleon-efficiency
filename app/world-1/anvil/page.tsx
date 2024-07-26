import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import Anvil from "./content";

export const metadata: Metadata = {
    title: "Anvil",
}

export default function Page() {
    return (
        <Box>
            <Suspense><Anvil /></Suspense>
        </Box>
    )
}