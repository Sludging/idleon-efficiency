import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import ResearchContent from "../../../components/world-7/research/researchContent";

export const metadata: Metadata = {
    title: "Research",
}

export default function Page() {
    return (
        <Box>
            <Suspense><ResearchContent /></Suspense>
        </Box>
    )
}
