import styled from 'styled-components'

import {
    Header,
    Text,
    Button,
    Box
} from "grommet"
import { useContext } from 'react'
import { AppContext } from '../data/appContext'
import { AuthContext } from '../data/firebase/authContext'

const Container = styled.section`
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
`

export default function Layout({
    children
}: {
    children: React.ReactNode
}) {
    const user = useContext(AuthContext);
    const idleonData = useContext(AppContext);
    return (
        <Container>
            <Header background="light-4" pad="medium" height="xsmall">
                <Box justify="between" direction="row" gap="medium" width="100%">
                    <Text>Last Updated: {idleonData.getLastUpdated()}</Text>
                    {user && user.isAnonymous ?
                        <Button>Login</Button>
                        : <Text>Logged in as: {user?.displayName}</Text>
                    }
                </Box>
            </Header>
            <main>{children}</main>
        </Container>
    )
}