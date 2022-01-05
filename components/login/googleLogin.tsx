import { Anchor, Box, Text } from "grommet";
import { useContext, useEffect, useMemo, useState } from "react";
import { GoogleDeviceLogin } from "../../data/domain/login/googleDeviceLogin";
import { AuthContext } from "../../data/firebase/authContext";
import ShadowBox from "../base/ShadowBox";

export default function GoogleLogin () {
    const [code, setCode] = useState<string | undefined>(undefined);
    const [verificationUrl, setVerificationUrl] = useState<string | undefined>(undefined);
    const [deviceCode, setDeviceCode] = useState<string | undefined>(undefined);
    const [retryCounter, setRetryCounter] = useState<number>(0);
    const [error, setError] = useState<string | undefined>(undefined);
    const auth = useContext(AuthContext);

    const getCode = async () => {
        const getCodeRes = await GoogleDeviceLogin.getCode();
        if (getCodeRes) {
            setDeviceCode(getCodeRes.device_code);
            setCode(getCodeRes.user_code);
            setVerificationUrl(getCodeRes.verification_url);
        }
    }

    const checkResult = async (retryCount: number, code: string) => {
        if (retryCounter >= 60) {
            setError("Reached maximum number of retries, please refresh the page and try again.");
            return;
        }
        const pollResult = await GoogleDeviceLogin.pollForAuth(code);
        if (pollResult) {
            if (pollResult.error) {
                return false;
            }
            auth?.tokenFunction(pollResult.id_token)
            return true;
        }
    }

    

    useEffect(() => {
        if (!deviceCode) {
            getCode();
        }
        else {
            checkResult(retryCounter, deviceCode)
            .then((res) => {
                if (!res) {
                    setTimeout(() => setRetryCounter(retryCounter + 1), 5000);
                }
            });
        }

    }, [deviceCode, retryCounter]);

    return (
        <ShadowBox background="dark-1" pad="large" gap="small">
            { !code ? <Text>Getting code from google, please wait.</Text>
            : <Text>Please go to <Anchor href={verificationUrl} target="_blank" title={verificationUrl}>{verificationUrl}</Anchor> and use the code {code}</Text>}
            { deviceCode && <Text>Waiting for authentication to complete, retried: {retryCounter} times.</Text>}
            { error && <Text>{error}</Text>}
        </ShadowBox>
    )
}