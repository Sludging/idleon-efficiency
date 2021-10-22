import React from 'react'
import styled from 'styled-components'

import {
    Header,
    Text,
    Button,
    Box,
    Layer,
    TextInput
} from "grommet"
import { useContext, useState } from 'react'
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
    const authData = useContext(AuthContext);
    const user = authData?.user;
    const idleonData = useContext(AppContext);

    const [showLayer, setShowLayer] = useState(false);
    const [value, setValue] = useState('');

    const onButtonClick = (toCall: Function | undefined, value?: string) => {
        if (toCall) {
            if (value) {
                toCall(value);
            }
            else {
                toCall();
            }
        }
    }

    return (
        <Container>
            <Header background="light-4" pad="medium" height="xsmall">
                <Box justify="between" direction="row" gap="medium" width="100%">
                    <Text>Last Updated: {idleonData.getLastUpdated()}</Text>
                    {user && <React.Fragment><Text>Logged in as: {user?.displayName}</Text><Button onClick={() => onButtonClick(authData?.logoutFunction)}>Logout</Button></React.Fragment>}
                    {!user && <Button onClick={() => setShowLayer(true)}>Login</Button>}
                    {showLayer &&
                        <Layer
                            onEsc={() => setShowLayer(false)}
                            onClickOutside={() => setShowLayer(false)}
                        >
                            <Button label="Google Login" onClick={() => onButtonClick(authData?.loginFunction)} />
                            <TextInput
                                placeholder="type here"
                                value={value}
                                onChange={event => setValue(event.target.value)}
                            />
                            <Button label="Handle Token" onClick={() => onButtonClick(authData?.tokenFunction, value)} />
                        </Layer>
                    }
                </Box>
            </Header>
            <main>{children}</main>
        </Container>
    )
}