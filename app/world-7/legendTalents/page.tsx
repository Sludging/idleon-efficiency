import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import LegendTalents from "./content";

export const metadata: Metadata = {
    title: "Legend Talents",
}

export default function Page() {
    return (
        <Box>
            <Suspense><LegendTalents /></Suspense>
        </Box>
    )
}
