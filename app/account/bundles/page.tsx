import { Box, Heading, Text } from "grommet";
import type { Metadata } from "next";
import BundlesContent from "../../../components/account/bundles/BundlesContent";

export const metadata: Metadata = {
    title: "Bundles",
};

export default function Page() {
    return <Box>
        <Heading level="2" size="medium" style={{ fontWeight: "normal" }}>Bundles</Heading>
        <Box gap="medium">
            <Text size="small" color="accent-2">
                Compare owned bundles, advertised contents, and prices. Current offers may differ.
            </Text>
            <BundlesContent />
        </Box>
    </Box>;
}
