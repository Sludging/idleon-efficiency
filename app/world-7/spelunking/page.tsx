import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import Spelunking from "./content";

export const metadata: Metadata = {
    title: "Spelunking",
}

export default function Page() {
    return (
        <Box>
            <Suspense><Spelunking /></Suspense>
        </Box>
    )
}
