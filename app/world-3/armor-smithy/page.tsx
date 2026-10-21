import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import ArmorSmithy from "./content";

export const metadata: Metadata = {
    title: "Armor Smithy",
}

export default function Page() {
    return (
        <Box>
            <Suspense><ArmorSmithy /></Suspense>
        </Box>
    )
}
