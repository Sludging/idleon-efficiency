import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import TaskBoard from "./content";

export const metadata: Metadata = {
    title: "Task Board",
}

export default function Page() {
    return (
        <Box>
            <Suspense><TaskBoard /></Suspense>
        </Box>
    )
}