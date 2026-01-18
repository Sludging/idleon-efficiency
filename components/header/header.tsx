import { Box, Header } from "grommet";
import Link from "next/link";
import Image from "next/image";
import { DataStatusDisplay } from "./dataStatus";
import { Profile } from "./profile";

// const PointerImage = styled(Image)`
//     cursor: pointer;
// `

export const HeaderComponent = () => {
    return (
        <Header background="dark-1" height="56px" border={{ color: "white-1", side: "bottom" }}>
            <Box width={{ max: '1440px' }} margin={{ left: 'auto', right: 'auto' }} direction="row" justify='between' align="center" pad="small" fill>
                <Link prefetch={false} href={"https://www.idleonefficiency.com/"}>
                    <Box>
                        <Image alt="Logo" src="/logo.svg" height={21} width={171} />
                    </Box>
                </Link>
                <Box direction="row" gap="xlarge" pad="medium">
                    <DataStatusDisplay />
                    <Profile />
                </Box>
            </Box>
        </Header>
    );
}
