import { Anchor, Box, Button, Text } from "grommet";
import { useEffect, useState } from "react";
import { GoogleDeviceLogin } from "../../data/domain/login/googleDeviceLogin";
import ShadowBox from "../base/ShadowBox";
import { useAuthStore } from "../../lib/providers/authStoreProvider";

export default function GoogleLogin () {
    const [code, setCode] = useState<string | undefined>(undefined);
    const [verificationUrl, setVerificationUrl] = useState<string | undefined>(undefined);
    const [deviceCode, setDeviceCode] = useState<string | undefined>(undefined);
    const [retryCounter, setRetryCounter] = useState<number>(0);
    const [error, setError] = useState<string | undefined>(undefined);
    
    const { googleLogin } = useAuthStore(
        (state) => state,
    )

    const getCode = async () => {
        const getCodeRes = await GoogleDeviceLogin.getCode();
        if (getCodeRes) {
            setDeviceCode(getCodeRes.device_code);
            setCode(getCodeRes.user_code);
            setVerificationUrl(getCodeRes.verification_url);
        }
    }

    const checkResult = async (code: string) => {
        if (retryCounter >= 60) {
            setError("Reached maximum number of retries, please refresh the page and try again.");
            return;
        }
        const pollResult = await GoogleDeviceLogin.pollForAuth(code);
        if (pollResult) {
            if (pollResult.error) {
                return false;
            }
            googleLogin(pollResult.id_token!)
            return true;
        }
    }

    const copyToClipboard = () => {
        if (navigator && navigator.clipboard && code) {
            return navigator.clipboard.writeText(code);
        }
        return Promise.reject('The Clipboard API is not available.');
    }

    const onButtonClick = () => {
        copyToClipboard();
        window.open(verificationUrl,'_newtab');
    }

    if (!deviceCode) {
        getCode();
    }
    else {
        checkResult(deviceCode)
        .then((res) => {
            if (!res) {
                setTimeout(() => setRetryCounter(retryCounter + 1), 5000);
            }
        });
    }

    return (
        <ShadowBox background="dark-1" pad="large" gap="small">
            { !code ? <Text>Getting code from google, please wait.</Text>
            : 
            <Box pad="small" gap="medium">
                <Text>Please go to <Anchor href={verificationUrl} target="_blank" title={verificationUrl}>{verificationUrl}</Anchor> and use the code {code}</Text>
                <Box width="50%" align="center" fill>
                    <Button style={{ color: "white" }} primary color="brand" label="Copy code and open URL" onClick={() => onButtonClick()} />
                </Box>
            </Box>
            }
            { !error && deviceCode && <Text>Waiting for authentication to complete, retried: {retryCounter} times.</Text>}
            { error && <Text>{error}</Text>}
        </ShadowBox>
    )
}
