"use client"

import { Anchor, Box, Button, Text } from "grommet";
import { useEffect, useState } from "react";
import { GoogleDeviceLogin } from "../../data/domain/login/googleDeviceLogin";
import ShadowBox from "../base/ShadowBox";
import { useAuthStore } from "../../lib/providers/authStoreProvider";
import { useShallow } from "zustand/react/shallow";

type GoogleLoginProps = {
    addAccount?: boolean;
    onSuccess?: () => void;
};

export default function GoogleLogin({ addAccount = false, onSuccess }: GoogleLoginProps) {
    const [code, setCode] = useState<string | undefined>(undefined);
    const [verificationUrl, setVerificationUrl] = useState<string | undefined>(undefined);
    const [deviceCode, setDeviceCode] = useState<string | undefined>(undefined);
    const [retryCounter, setRetryCounter] = useState<number>(0);
    const [error, setError] = useState<string | undefined>(undefined);

    const { googleLogin } = useAuthStore(
        useShallow((state) => ({ googleLogin: state.googleLogin })),
    );

    useEffect(() => {
        let cancelled = false;

        const fetchCode = async () => {
            const getCodeRes = await GoogleDeviceLogin.getCode();
            if (!cancelled && getCodeRes) {
                setDeviceCode(getCodeRes.device_code);
                setCode(getCodeRes.user_code);
                setVerificationUrl(getCodeRes.verification_url);
            }
        };

        fetchCode();

        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        if (!deviceCode || retryCounter >= 60) {
            return;
        }

        let cancelled = false;
        let timeoutId: ReturnType<typeof setTimeout> | undefined;

        const poll = async () => {
            const pollResult = await GoogleDeviceLogin.pollForAuth(deviceCode);
            if (cancelled) {
                return;
            }

            if (pollResult && !pollResult.error && pollResult.id_token) {
                const ok = await googleLogin(pollResult.id_token, { addAccount });
                if (!cancelled) {
                    if (ok) {
                        onSuccess?.();
                    } else {
                        setError("Sign-in failed. Please try again.");
                    }
                }
                return;
            }

            timeoutId = setTimeout(() => {
                if (!cancelled) {
                    setRetryCounter((count) => count + 1);
                }
            }, 5000);
        };

        poll();

        return () => {
            cancelled = true;
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [deviceCode, retryCounter, addAccount, googleLogin, onSuccess]);

    const copyToClipboard = () => {
        if (navigator && navigator.clipboard && code) {
            return navigator.clipboard.writeText(code);
        }
        return Promise.reject('The Clipboard API is not available.');
    }

    const onButtonClick = () => {
        copyToClipboard();
        window.open(verificationUrl, '_newtab');
    }

    const displayError = error ?? (retryCounter >= 60
        ? "Reached maximum number of retries, please refresh the page and try again."
        : undefined);

    return (
        <ShadowBox background="dark-1" pad="large" gap="small">
            {!code ? <Text>Getting code from google, please wait.</Text>
                :
                <Box pad="small" gap="medium">
                    <Text>Please go to <Anchor href={verificationUrl} target="_blank" title={verificationUrl}>{verificationUrl}</Anchor> and use the code {code}</Text>
                    <Box width="50%" align="center" fill>
                        <Button style={{ color: "white" }} primary color="brand" label="Copy code and open URL" onClick={() => onButtonClick()} />
                    </Box>
                </Box>
            }
            {!displayError && deviceCode && <Text>Waiting for authentication to complete, retried: {retryCounter} times.</Text>}
            {displayError && <Text color="accent-1">{displayError}</Text>}
        </ShadowBox>
    )
}
