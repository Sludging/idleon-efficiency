import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import Quests from "./content";

export const metadata: Metadata = {
    title: "Quests",
}

export default function Page() {
    return (
        <Box>
            <Suspense><Quests /></Suspense>
        </Box>
    )
}