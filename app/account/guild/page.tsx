import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import GuildDisplay from "./content";

export const metadata: Metadata = {
    title: "Guild",
}

export default function Page() {
    return (
        <Box>
            <Suspense><GuildDisplay /></Suspense>
        </Box>
    )
}
