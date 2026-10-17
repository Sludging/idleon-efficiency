import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import MenagerieContent from "./content";

export const metadata: Metadata = {
    title: "Menagerie",
};

export default function Page() {
    return (
        <Box>
            <Suspense><MenagerieContent /></Suspense>
        </Box>
    );
}
