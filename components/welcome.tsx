import {
    Box,
    Heading,
    Text,
    Anchor,
    Paragraph
} from 'grommet'
import { useEffect } from 'react';

export default function Welcome() {

    useEffect(() => {
    });
    return (
        <Box>
            <Box fill align="center" gap="medium">
                <Heading>Welcome to Idleon Efficiency</Heading>
                <Text size="large">Aimed to provide players of the game Legends of Idleon with tools to become more efficient.</Text>
                <Box justify="center" align="center" background="status-critical" pad="medium" round="large">
                    <Text size="large">This website is very much a work in progress and subject to change.</Text>
                </Box>
            </Box>
            <Box pad="large" gap="xsmall">
                <Text>
                    If you would like to help test this website, Go to <Anchor target="_blank" href="https://www.legendsofidleon.com/ytGl5oc/">Legends of Idleon main website</Anchor> and open DevTools.
                </Text>
                <Text>Inside the DevTools console copy paste the following code:</Text>
                <pre className="prettyprint">
                    <Box background="rgb(245 245 245)">
                        <code className="language-javascript">{`
                        var app = firebase.initializeApp({
                            apiKey: "AIzaSyAU62kOE6xhSrFqoXQPv6_WHxYilmoUxDk",
                            authDomain: "idlemmo.firebaseapp.com",
                            databaseURL: "idlemmo.firebaseio.com",
                            projectId: "idlemmo",
                        }, "idleon");

                        var provider = new firebase.auth.GoogleAuthProvider()
                        app.auth().signInWithPopup(provider)
                        .then((result) => {
                            var user = result.user;
                            var credential = result.credential;
                            console.log(credential["idToken"]);
                        })
                    `}</code>
                    </Box>
                </pre>

                <Box gap="small" pad="medium">
                    <Paragraph fill size="medium">
                        Running this code will open up a pop-up to login to Legends of Idleon through Google, click your usual user name.

                        After the pop-up is closed you will see a long string in the console. Don&apos;t share that string with anyone!!!

                        Copy the string and press the &apos;Login&apos; button at the top right

                        Input the value into the text input and press the &apos;Handle Token&apos; button.

                        You should now see a page with all your stamps!
                    </Paragraph>
                </Box>
            </Box >
        </Box>
    )
}