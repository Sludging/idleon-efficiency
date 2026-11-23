'use client'

import {
    Box,
    Button,
    FormField,
    Grid,
    Layer,
    ResponsiveContext,
    Text,
    TextInput,
} from 'grommet';
import styled from 'styled-components';
import { useContext, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useAuthStore } from '../../lib/providers/authStoreProvider';
import ShadowBox from '../base/ShadowBox';
import GoogleLogin from './googleLogin';
import SteamLogin from './steamLogin';

const VerticalLine = styled.hr`
    border: 0;
    margin: 0;
    border-left: 1px solid #30333A;
    height: 100%;
    float: left;
`;

type LoginFormProps = {
    addAccount?: boolean;
    onSuccess?: () => void;
    onCancel?: () => void;
};

const formatAuthError = (code?: string): string => {
    switch (code) {
        case 'auth/invalid-credential':
            return 'The inputed token is invalid, please try again.';
        case 'auth/invalid-email':
            return 'Invalid username and email, please try again.';
        case 'auth/user-not-found':
            return 'User not found.';
        default:
            return 'Something went wrong, please try again.';
    }
};

export default function LoginForm({ addAccount = false, onSuccess, onCancel }: LoginFormProps) {
    const { emailLogin, appleLogin, errorCode, clearError } = useAuthStore(
        useShallow((state) => ({
            emailLogin: state.emailLogin,
            appleLogin: state.appleLogin,
            errorCode: state.errorCode,
            clearError: state.clearError,
        })),
    );
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [activeSubFlow, setActiveSubFlow] = useState<'google' | 'steam' | null>(null);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const size = useContext(ResponsiveContext);

    const handleEmailLogin = async () => {
        clearError();
        setHasSubmitted(true);
        const ok = await emailLogin(email, password, { addAccount });
        if (ok) {
            onSuccess?.();
        }
    };

    const handleAppleLogin = async () => {
        clearError();
        setHasSubmitted(true);
        const ok = await appleLogin({ addAccount });
        if (ok) {
            onSuccess?.();
        }
    };

    const openSubFlow = (type: 'google' | 'steam') => {
        clearError();
        setHasSubmitted(false);
        setActiveSubFlow(type);
    };

    // Inside the Add Account modal, render Google/Steam inline to avoid stacked modals.
    if (addAccount && activeSubFlow) {
        return (
            <Box gap="small">
                <Box direction="row" justify="between" align="center">
                    <Button
                        plain
                        label="← Back to sign-in options"
                        onClick={() => setActiveSubFlow(null)}
                        color="accent-2"
                    />
                    {onCancel && (
                        <Button plain label="Close" onClick={onCancel} color="accent-3" />
                    )}
                </Box>
                {activeSubFlow === 'google' && <GoogleLogin addAccount onSuccess={onSuccess} />}
                {activeSubFlow === 'steam' && <SteamLogin addAccount onSuccess={onSuccess} />}
            </Box>
        );
    }

    const displayError = hasSubmitted && errorCode ? formatAuthError(errorCode) : '';

    return (
        <>
            <ShadowBox pad="large" background="dark-2" fill margin={{ left: 'auto', right: 'auto' }} flex={false}>
                <Box gap="medium">
                    {addAccount && (
                        <Box direction="row" justify="between" align="center" border={{ color: 'grey-1', side: 'bottom' }} pad={{ bottom: 'small' }}>
                            <Text size="large">Add IdleOn Account</Text>
                            {onCancel && (
                                <Button plain label="Close" onClick={onCancel} color="accent-3" />
                            )}
                        </Box>
                    )}
                    <Grid columns={size == 'small' ? ['100%'] : ['45%', '10%', '45%']} pad={addAccount ? undefined : { left: 'large' }}>
                        <Box
                            gap="medium"
                            alignSelf="center"
                            pad={{ left: 'medium', right: 'medium', bottom: size == 'small' ? 'xlarge' : undefined }}
                            border={size == 'small' ? { size: '2px', color: 'grey-1', side: 'bottom' } : undefined}
                        >
                            <Text size="24px">Sign in with social</Text>
                            <Text size="xsmall">Use this if you signed into Legends of Idleon using Google or Apple</Text>
                            <Button style={{ color: 'white' }} primary color="accent-1" label="Google Login" onClick={() => openSubFlow('google')} />
                            <Button style={{ color: 'white' }} primary color="brand" label="Apple Login" onClick={handleAppleLogin} />
                            <Button style={{ color: 'white' }} primary color="accent-3" label="Steam Login" onClick={() => openSubFlow('steam')} />
                        </Box>
                        {size != 'small' && (
                            <Box align="center">
                                <VerticalLine />
                                <Box margin={{ bottom: 'medium', top: 'small' }} align="center">
                                    <Text>Or</Text>
                                </Box>
                                <VerticalLine />
                            </Box>
                        )}
                        <Box gap="small" pad={{ left: 'large', right: 'large', top: size == 'small' ? 'medium' : undefined }}>
                            <Text size="24px">Sign in with email</Text>
                            <Text size="xsmall">Use this if you signed into Legends of Idleon using email</Text>
                            <TextInput
                                placeholder="Enter Email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                            <TextInput
                                placeholder="Enter Password"
                                value={password}
                                type="password"
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <Button primary color="brand" label="Login" onClick={handleEmailLogin} />
                        </Box>
                    </Grid>
                    {displayError && (
                        <Box pad={{ top: 'medium' }} align="center">
                            <FormField error={<Text color="accent-1">{displayError}</Text>} />
                        </Box>
                    )}
                </Box>
            </ShadowBox>
            {!addAccount && activeSubFlow && (
                <Layer
                    onEsc={() => setActiveSubFlow(null)}
                    onClickOutside={() => setActiveSubFlow(null)}
                    modal={true}
                    position="center"
                >
                    {activeSubFlow === 'google' && <GoogleLogin onSuccess={() => setActiveSubFlow(null)} />}
                    {activeSubFlow === 'steam' && <SteamLogin onSuccess={() => setActiveSubFlow(null)} />}
                </Layer>
            )}
        </>
    );
}
