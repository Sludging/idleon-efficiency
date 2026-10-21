import { Box, Heading } from "grommet";
import { Suspense } from "react";
import type { Metadata } from "next";
import EventShopContent from "./content";

export const metadata: Metadata = {
    title: "Event Shop",
};

export default function Page() {
    return (
        <Box>
            <Heading level="2" size="medium" style={{ fontWeight: "normal" }}>Event Shop</Heading>
            <Suspense><EventShopContent /></Suspense>
        </Box>
    );
}
