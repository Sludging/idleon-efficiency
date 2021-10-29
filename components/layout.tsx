import React from 'react'
import styled from 'styled-components'

import {
    Header,
    Text,
    Button,
    Box,
    Layer,
    Main,
    TextInput
} from "grommet"
import { useContext, useState, useEffect } from 'react'
import { AppContext } from '../data/appContext'
import { AuthContext } from '../data/firebase/authContext'
import Welcome from './welcome'
import { User } from '@firebase/auth'

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
    const idleonData = useContext(AppContext);

    const [showLayer, setShowLayer] = useState(false);
    const [user, setUser] = useState<User | undefined | null>(null);
    const [lastUpdated, setLastUpdated] = useState<string>("");
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
        setShowLayer(false);
    }

    useEffect(() => {
        setUser(authData?.user);
        setLastUpdated(idleonData.getLastUpdated())
    }, [authData, idleonData])

    return (
        <Container>
            <Header background="light-4" pad="medium" height="xsmall">
                <Text>Idleon Efficiency</Text>
                {user && <Box direction="row" gap="xlarge"><Text>Last Updated: {lastUpdated}</Text><Button onClick={() => onButtonClick(authData?.logoutFunction)}>Logout</Button></Box>}
                {!user && <Box width="100%" align="end"><Button onClick={() => setShowLayer(true)}>Login</Button></Box>}
                {showLayer &&
                    <Layer
                        onEsc={() => setShowLayer(false)}
                        onClickOutside={() => setShowLayer(false)}
                        modal={true}
                        position="center"


                >
                        <Box pad="medium" gap="small" width="medium" background="grey">
                            <Button disabled label="Google Login" color="black" onClick={() => onButtonClick(authData?.loginFunction)} />
                            <Box align="center" flex="grow" pad="small">
                                <Text>or</Text>
                            </Box>
                            <TextInput
                                placeholder="ID Token"
                                value={value}
                                onChange={event => setValue(event.target.value)}
                            />
                            <Button label="Handle Token" color="black" onClick={() => onButtonClick(authData?.tokenFunction, value)} />
                        </Box>
                    </Layer>
                }
            </Header>
            {user && <Main overflow='true'>{children}</Main>}
            {!user && <Main><Welcome /></Main>}
        </Container>
    )
}