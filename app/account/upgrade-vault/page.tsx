import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import { UpgradeVaultDisplay } from "../../../components/account/upgradeVaultDisplay";

export const metadata: Metadata = {
    title: "Upgrade Vault",
}

export default function Page() {
    return (
        <Box>
            <Suspense><UpgradeVaultDisplay /></Suspense>
        </Box>
    )
}