import { Box, Heading } from "grommet";
import type { Metadata } from "next";
import GemShopContent from "./content";

export const metadata: Metadata = {
    title: "Gem Shop",
};

export default function Page() {
    return (
        <Box>
            <Heading level="2" size="medium" style={{ fontWeight: "normal" }}>Gem Shop</Heading>
            <GemShopContent />
        </Box>
    );
}
