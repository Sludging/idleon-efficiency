import { Box, Heading } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import { UpgradeVaultDisplay } from "../../../components/account/upgradeVaultDisplay";

export const metadata: Metadata = {
    title: "Upgrade Vault",
}

export default function Page() {
    return (
        <Box>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Upgrade Vault</Heading>
            <Suspense><UpgradeVaultDisplay /></Suspense>
        </Box>
    )
}