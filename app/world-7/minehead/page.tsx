import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import MineheadContent from "./content";

export const metadata: Metadata = {
    title: "Minehead",
}

export default function Page() {
    return (
        <Box>
            <Suspense><MineheadContent /></Suspense>
        </Box>
    )
}
