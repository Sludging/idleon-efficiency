"use client"

import { Box } from "grommet";
import { usePathname } from "next/navigation";

const specialRoutes = [
    "/players",
    "/account/task-board",
    "/"
]

// ContentWrapper is used to wrap everything in the "content section" of the site (i.e. anything between the header and the footer).
// We limit most routes to 1440px max width and automatic margin (to have it centered).
// Special routes are ones that have a secondary top navigation bar and we want them to extend the same way as the header.
const ContentWrapper = ({
    children
}: {
    children: React.ReactNode
}) => {
    const pathname = usePathname();

    // Not sure if there's a better way to handle this.
    if (!pathname) {
        return <>Loading...</>
    }

    const isSpecialRoute = specialRoutes.includes(pathname);

    return (
        <Box width={{ max: !isSpecialRoute ? '1440px' : '' }} margin={{ left: 'auto', right: 'auto' }} fill="horizontal">
            <Box pad={{ right: !isSpecialRoute ? 'large' : '', left: !isSpecialRoute ? 'large' : '', bottom: 'xlarge' }}>
                {children}
            </Box>
        </Box>
    )
}

export default ContentWrapper;
