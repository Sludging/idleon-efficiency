import { Box } from "grommet";
import { Suspense } from "react";
import type { Metadata } from "next";
import ZenithMarketContent from "./content";

export const metadata: Metadata = {
    title: "Zenith Market",
};

export default function Page() {
    return (
        <Box>
            <Suspense>
                <ZenithMarketContent />
            </Suspense>
        </Box>
    );
}
