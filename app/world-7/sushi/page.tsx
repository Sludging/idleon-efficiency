import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import SushiContent from "./content";

export const metadata: Metadata = {
    title: "Sushi Station",
}

export default function Page() {
    return (
        <Box>
            <Suspense><SushiContent /></Suspense>
        </Box>
    )
}
