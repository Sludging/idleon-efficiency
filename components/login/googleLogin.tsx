import { Anchor, Text } from "grommet";
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

    

    useEffect(() => {
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

    }, [deviceCode, retryCounter]);

    return (
        <ShadowBox background="dark-1" pad="large" gap="small">
            { !code ? <Text>Getting code from google, please wait.</Text>
            : <Text>Please go to <Anchor href={verificationUrl} target="_blank" title={verificationUrl}>{verificationUrl}</Anchor> and use the code {code}</Text>}
            { !error && deviceCode && <Text>Waiting for authentication to complete, retried: {retryCounter} times.</Text>}
            { error && <Text>{error}</Text>}
        </ShadowBox>
    )
}