import { Box, Heading } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import CompassDisplay from "../../../components/account/compassDisplay";

export const metadata: Metadata = {
    title: "Compass",
    description: "View and manage your Compass upgrades"
}

export default function Page() {
    return (
        <Box pad={{ horizontal: "medium" }}>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Compass Upgrades</Heading>
            <Suspense fallback={<Box pad="large">Loading Compass data...</Box>}>
                <CompassDisplay />
            </Suspense>
        </Box>
    )
}