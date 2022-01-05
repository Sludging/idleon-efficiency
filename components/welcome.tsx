import {
    Box,
    Text,
    Anchor,
    Grid,
    TextInput,
    Button,
    Layer,
    Image,
    FormField,
    ResponsiveContext
} from 'grommet'
import styled from 'styled-components'
import { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../data/firebase/authContext'
import ShadowBox from './base/ShadowBox';
import { MouseEventHandler } from 'hoist-non-react-statics/node_modules/@types/react';
import { NextSeo } from 'next-seo';
import GoogleLogin from './login/googleLogin';

const VerticalLine = styled.hr`
    border: 0;
    margin: 0;
    border-left: 1px solid #30333A;
    height: 100%; 
    float: left;
`

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
    const [error, setError] = useState<string>('');

    const size = useContext(ResponsiveContext);

    const onActive = (nextIndex: number) => setIndex(nextIndex);
    const onButtonClick = (toCall: Function | undefined, value?: string, value2?: string) => {
        try {
            if (toCall) {
                if (value2) {
                    toCall(value, value2, handleError);
                }
                else if (value) {
                    toCall(value, handleError);
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

    const handleError = (code: string) => {
        switch (code) {
            case "auth/invalid-credential":
                setError("The inputed token is invalid, please try again");
                break;
            case "auth/invalid-email":
                setError("Invalid username and email, please try again");
                break;
            default:
                setError("Something went wrong, please try again");
                break;
        }
    }


    useEffect(() => {
    });
    return (
        <Box>
            <NextSeo title="Boost your efficiency in Legends of Idleon!" />
            <Box fill align="center" gap="medium" height={{ min: '571px', max: '571px' }} background="brand">
                <Box margin={{ left: 'auto', right: 'auto' }}>
                    <Grid columns="1/2" fill pad="xlarge">
                        <Box pad="small" gap="small">
                            <Text size={size == "small" ? "32px" : "52px"}>Welcome to Idleon Efficiency</Text>
                            <Text size={size == "small" ? "18px" : "27px"}>Aimed to provide players of the game Legends of Idleon with tools to become more efficient</Text>
                        </Box>
                        <Box></Box>
                    </Grid>
                </Box>
                <Box width={{ max: '1440px' }} pad="large" fill margin={{ left: 'auto', right: 'auto' }} style={{ position: 'relative', top: '150px' }} >
                    {!authData?.isLoading && !authData?.user &&
                        <ShadowBox pad="large" background="dark-2" fill margin={{ left: 'auto', right: 'auto' }} flex={false}>
                            <Box>
                                <Grid columns={size == "small" ? ["100%"] : ["45%", "10%", "45%"]} pad={{ left: "large"}}>
                                    <Box gap="medium" alignSelf="center" pad={{ left: 'medium', right: 'medium', bottom: size == "small" ? 'xlarge' : undefined}} border={size == "small" ? {size: '2px', color: 'grey-1', side: 'bottom'} : undefined}>
                                        <Text size="24px">Sign in with token</Text>
                                        <Text size="xsmall">Use this if you signed into Legends of Idleon using google</Text>
                                        <Button style={{ color: "white" }} primary color="accent-1" label="Google Login" onClick={() => setShowLayer(true)} />
                                    </Box>
                                    {size != "small" && <Box align="center">
                                        <VerticalLine />
                                        <Box margin={{ bottom: 'medium', top: 'small' }} align="center">
                                            <Text>Or</Text>
                                        </Box>
                                        <VerticalLine />
                                    </Box>
                                    }
                                    <Box gap="small" pad={{ left: 'large', right: 'large', top: size == "small" ? 'medium' : undefined}}>
                                        <Text size="24px">Sign in with email</Text>
                                        <Text size="xsmall">Use this if you signed into Legends of Idleon using email</Text>
                                        <TextInput
                                            placeholder="Enter Email"
                                            value={email}
                                            onChange={event => setEmail(event.target.value)}
                                        />
                                        <TextInput
                                            placeholder="Enter Password"
                                            value={password}
                                            type='password'
                                            onChange={event => setPassword(event.target.value)}
                                        />
                                        <Button primary color="brand" label="Login" onClick={() => onButtonClick(authData?.emailLoginFunction, email, password)} />
                                    </Box>
                                </Grid>
                                {
                                    error != '' &&
                                    <Box pad={{ top: "medium" }} align="center">
                                        <FormField error={<Text color="accent-1">{error}</Text>} />
                                    </Box>
                                }
                            </Box>
                        </ShadowBox>
                    }
                </Box>
            </Box>
            <Box height="300px"></Box>
            <Box>
                {showLayer &&
                    <Layer
                        onEsc={() => setShowLayer(false)}
                        onClickOutside={() => setShowLayer(false)}
                        modal={true}
                        position="center"
                    >
                        <GoogleLogin />
                    </Layer>
                }
                <Box width={{ max: '1440px' }} align="center" pad="small" fill margin={{ left: 'auto', right: 'auto' }}>
                    <Text size={size == "small" ? "26px" : "38px"}>Awesome Features</Text>
                </Box>
                <Box width={{ max: '1440px' }} align="center" pad="small" fill margin={{ left: 'auto', right: 'auto' }}>
                    <Grid columns={["2/3", "1/3"]} fill>
                        <Box>
                            <Image alt="feature1" src={'/feature1.png'} />
                        </Box>
                        <Box direction="row" gap="medium" pad="large" align="center">
                            <Box gap="small">
                                <Text size={size == "small" ? "medium" : "xlarge"}>Easily see your stamps</Text>
                                <Text size={size == "small" ? "xsmall" : "small"}>Keep tracks of your stamps and know exactly how much the next level will cost.</Text>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid columns={["1/3", "2/3"]} fill>
                        <Box direction="row" gap="medium" pad="large" align="center">
                            <Box gap="small">
                                <Text size={size == "small" ? "medium" : "xlarge"}>All your players - in one spot.</Text>
                                <Text size={size == "small" ? "xsmall" : "small"}>See equipment, cards, anvil information and much more!</Text>
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
                                <Text size={size == "small" ? "medium" : "xlarge"}>Achievement Tracker</Text>
                                <Text size={size == "small" ? "xsmall" : "small"}>Easily track your achievements, and see progress on ones you&apos;ve yet to complete.</Text>
                            </Box>
                        </Box>
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}