import {
    Box,
    Text,
    Anchor,
    Grid,
    TextInput,
    Button,
    Layer,
    Image,
    ResponsiveContext
} from 'grommet'
import { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../data/firebase/authContext'
import ShadowBox from './base/ShadowBox';
import { MouseEventHandler } from 'hoist-non-react-statics/node_modules/@types/react';
import { NextSeo } from 'next-seo';

function SpecialButton({ isActive, text, clickHandler, step }: { isActive: boolean, text: string | React.ReactNode, clickHandler: MouseEventHandler, step: number }) {
    return (
        <Button fill="horizontal" plain active={isActive} onClick={clickHandler} gap="medium">
            <Box background={isActive ? 'accent-4' : 'dark-2'} pad={{ left: 'medium', right: 'small', top: 'small', bottom: 'small' }} gap="small">
                <Text color={isActive ? 'brand' : 'accent-2'} size="14px">Step {step}</Text>
                <Text color='accent-2' size="18px" weight={isActive ? 'bold' : 'normal'}>{text}</Text>
            </Box>
        </Button>
    )
}

export default function Welcome() {
    const authData = useContext(AuthContext);
    const [value, setValue] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showLayer, setShowLayer] = useState(false);
    const [index, setIndex] = useState<number>(1);

    const size = useContext(ResponsiveContext);

    const onActive = (nextIndex: number) => setIndex(nextIndex);
    const onButtonClick = (toCall: Function | undefined, value?: string, value2?: string) => {
        try {
            if (toCall) {
                if (value2) {
                    toCall(value, value2);
                }
                else if (value) {
                    toCall(value);
                }
                else {
                    toCall();
                }
            }
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setShowLayer(false);
        }
    }


    useEffect(() => {
    });
    return (
        <Box>
            <NextSeo title="Boost your efficiency in Legends of Idleon!" />
            <Box fill align="center" gap="medium" height={{ min: '627px' }} background="brand">
                <Box margin={{ left: 'auto', right: 'auto' }}>
                    <Grid columns="1/2" fill pad="xlarge">
                        <Box pad="small" gap="small">
                            <Text size={ size == "small" ? "32px" : "52px"}>Welcome to Idleon Efficiency</Text>
                            <Text size={ size == "small" ? "18px" : "27px"}>Aimed to provide players of the game Legends of Idleon with tools to become more efficient</Text>
                        </Box>
                        <Box></Box>
                    </Grid>
                </Box>
                <Box width={{ max: '1440px' }} pad="large" fill margin={{ left: 'auto', right: 'auto' }} style={{ position: 'relative', top: '150px' }} >
                    {!authData?.isLoading && !authData?.user &&
                        <ShadowBox pad="large" background="dark-2" fill margin={{ left: 'auto', right: 'auto' }}>
                            { size == "small" ? 
                                <Box gap="medium" pad="small">
                                    <Text size="large">This website is not designed for mobile.</Text>
                                    <Text size="medium">Go check it out on desktop!</Text>
                                </Box>
                            : 
                            <Grid columns="1/2" fill pad={{ left: "large" }}>
                                <Box gap="medium">
                                    <Text size="32px">Sign in to Idleon Efficiency</Text>
                                    <Text size="xsmall">This only needs to be done once!</Text>
                                    <Anchor onClick={() => setShowLayer(true)} color="brand">Learn how to get your token</Anchor>
                                </Box>
                                <Box direction="row" fill pad="large" gap="small">
                                    <TextInput
                                        placeholder="Enter Token"
                                        value={value}
                                        onChange={event => setValue(event.target.value)}
                                    />
                                    <Button gap="large" primary color="brand" label="Login" onClick={() => onButtonClick(authData?.tokenFunction, value)} />
                                </Box>
                                <Box direction="row" fill pad="large" gap="small">
                                    <TextInput
                                        placeholder="Enter Email"
                                        value={email}
                                        onChange={event => setEmail(event.target.value)}
                                    />
                                    <TextInput
                                        placeholder="Enter Password"
                                        value={password}
                                        onChange={event => setPassword(event.target.value)}
                                    />
                                    <Button gap="large" primary color="brand" label="Login" onClick={() => onButtonClick(authData?.emailLoginFunction, email, password)} />
                                </Box>
                            </Grid>
                            }
                        </ShadowBox>
                    }
                </Box>
            </Box>
            <Box height="150px"></Box>
            <Box>
                {showLayer &&
                    <Layer
                        onEsc={() => setShowLayer(false)}
                        onClickOutside={() => setShowLayer(false)}
                        modal={true}
                        position="center"
                    >
                        <Box pad="medium" gap="medium" width="xxlarge" background="dark-2">
                            <Text size="32px">How to get your token</Text>
                            <Grid rows="1" columns={["1/3", "2/3"]}>
                                <Box height="100%" fill >
                                    <SpecialButton isActive={index == 1} clickHandler={() => onActive(1)} step={1} text={"Copy the code"} />
                                    <SpecialButton isActive={index == 2} clickHandler={() => onActive(2)} step={2} text={<Box gap="small" direction="row">Go to Legends of Idleon <Anchor target="_blank" href="https://www.legendsofidleon.com/ytGl5oc/"><Text style={{ textDecoration: 'underline' }} color='accent-2' size="18px">website</Text></Anchor></Box>} />
                                    <SpecialButton isActive={index == 3} clickHandler={() => onActive(3)} step={3} text={"Open DevTools and paste the code from Step 1."} />
                                    <SpecialButton isActive={index == 4} clickHandler={() => onActive(4)} step={4} text={"Login through the pop-up."} />
                                    <SpecialButton isActive={index == 5} clickHandler={() => onActive(5)} step={5} text={"Copy the long string from the console."} />
                                    <SpecialButton isActive={index == 6} clickHandler={() => onActive(6)} step={6} text={"Paste the string into the box and click Login."} />
                                </Box>
                                <Box fill background="dark-1">
                                    {index == 1 && <pre>
                                        <Box align="start" background="rgb(245 245 245)" style={{ color: 'black' }}>
                                            {`
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
                                    `}
                                        </Box>
                                    </pre>}
                                {index == 2 && <Image alt="idleon-website" src={'/idleon-website.png'} />}
                                {index == 3 && <Image alt="dev-tools" src={'/dev-tools.png'} />}
                                {index == 4 && <Image alt="popup" src={'/popup.png'} />}
                                {index == 5 && <Image alt="long-string" src={'/long-string.png'} />}
                                {index == 6 && <Image alt="login" src={'/login.png'} />}
                                </Box>
                            </Grid>
                        </Box>
                    </Layer>
                }
                <Box width={{ max: '1440px' }} align="center" pad="small" fill margin={{ left: 'auto', right: 'auto' }}>
                    <Text size={ size == "small" ? "26px" : "38px"}>Awesome Features</Text>
                </Box>
                <Box width={{ max: '1440px' }} align="center" pad="small" fill margin={{ left: 'auto', right: 'auto' }}>
                    <Grid columns={["2/3", "1/3"]} fill>
                        <Box>
                            <Image alt="feature1" src={'/feature1.png'} />
                        </Box>
                        <Box direction="row" gap="medium" pad="large" align="center">
                            <Box gap="small">
                                <Text size={ size == "small" ? "medium" : "xlarge"}>Easily see your stamps</Text>
                                <Text size={ size == "small" ? "xsmall" : "small"}>Keep tracks of your stamps and know exactly how much the next level will cost.</Text>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid columns={["1/3", "2/3"]} fill>
                        <Box direction="row" gap="medium" pad="large" align="center">
                            <Box gap="small">
                                <Text size={ size == "small" ? "medium" : "xlarge"}>All your players - in one spot.</Text>
                                <Text size={ size == "small" ? "xsmall" : "small"}>See equipment, cards, anvil information and much more!</Text>
                            </Box>
                        </Box>
                        <Box>
                            <Image alt="feature2" src={'/feature2.png'} />
                        </Box>
                    </Grid>
                    <Grid columns={["2/3", "1/3"]} fill>
                        <Box>
                            <Image alt="feature3" src={'/feature3.png'} />
                        </Box>
                        <Box direction="row" gap="medium" pad="large" align="center">
                            <Box gap="small">
                                <Text size={ size == "small" ? "medium" : "xlarge"}>Achievement Tracker</Text>
                                <Text size={ size == "small" ? "xsmall" : "small"}>Easily track your achievements, and see progress on ones you&apos;ve yet to complete.</Text>
                            </Box>
                        </Box>
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}