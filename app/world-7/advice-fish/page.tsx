import { Box } from "grommet";
import { Suspense } from "react";
import type { Metadata } from "next";
import AdviceFishContent from "./content";

export const metadata: Metadata = {
    title: "Advice Fish",
};

export default function Page() {
    return (
        <Box>
            <Suspense><AdviceFishContent /></Suspense>
        </Box>
    );
}
