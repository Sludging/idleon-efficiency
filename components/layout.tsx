import Head from 'next/head'
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

export const siteTitle = 'Idleon Efficiency'

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
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@200&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@800&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@400&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@650&display=swap" rel="stylesheet" />
                {/* <link rel="icon" href="/favicon.ico" /> */}
                <meta
                    name="description"
                    content="Portfolio Website for Vedha Straze"
                />
                {/* <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                /> */}
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
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