import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import IslandExpeditionsContent from "./content";

export const metadata: Metadata = {
    title: "Island Expeditions",
};

export default function Page() {
    return (
        <Box>
            <Suspense><IslandExpeditionsContent /></Suspense>
        </Box>
    );
}
