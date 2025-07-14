import { Box, Heading } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import { GrimoireDisplay } from "../../../components/account/grimoireDisplay";

export const metadata: Metadata = {
    title: "Grimoire",
    description: "View and manage your Grimoire upgrades"
}

export default function Page() {
    return (
        <Box pad={{ horizontal: "medium" }}>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Grimoire Upgrades</Heading>
            <Suspense fallback={<Box pad="large">Loading Grimoire data...</Box>}>
                <GrimoireDisplay />
            </Suspense>
        </Box>
    )
}