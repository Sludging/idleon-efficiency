import { Box } from "grommet";
import { Suspense } from "react";
import type { Metadata } from "next";
import ButtonContent from "./content";

export const metadata: Metadata = {
    title: "The Button",
};

export default function Page() {
    return (
        <Box>
            <Suspense><ButtonContent /></Suspense>
        </Box>
    );
}
