import { Box, Heading } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import RoyalArmoryDisplay from "../../../components/account/royalArmoryDisplay";

export const metadata: Metadata = {
    title: "Royal Armory",
    description: "View your Royal Armory upgrades, resources, Orblets, Outposts, and Royal Statues"
};

export default function Page() {
    return (
        <Box id="royal-armory">
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Royal Armory</Heading>
            <Suspense fallback={<Box pad="large">Loading Royal Armory data...</Box>}>
                <RoyalArmoryDisplay />
            </Suspense>
        </Box>
    );
}
