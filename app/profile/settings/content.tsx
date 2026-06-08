"use client"

import {
    Anchor,
    Box,
    CheckBox,
    Heading,
    Paragraph,
    Text,
} from 'grommet'
import { useState } from 'react';
import { useAuthStore } from '../../../lib/providers/authStoreProvider';
import {
    isNitroHashedEmailOptedOut,
    setNitroHashedEmailOptOut,
} from '../../../lib/nitroHashedEmailConsent';
import { useShallow } from 'zustand/react/shallow';

function ProfileSettings() {
    const { user } = useAuthStore(
        useShallow((state) => ({
            user: state.user,
        })),
    );
    const [personalizedAds, setPersonalizedAds] = useState(
        () => !isNitroHashedEmailOptedOut(),
    );

    if (!user) {
        return (
            <Box align="center" pad="medium">
                <Heading level="3">Go Away, you aren&apos;t logged in.</Heading>
            </Box>
        );
    }

    const onToggle = (checked: boolean) => {
        setPersonalizedAds(checked);
        setNitroHashedEmailOptOut(!checked);
    };

    return (
        <Box pad="medium" gap="medium">
            <Heading level="2">Settings</Heading>
            <Box gap="small">
                <CheckBox
                    label="Personalized ads (hashed email)"
                    checked={personalizedAds}
                    onChange={(event) => onToggle(event.target.checked)}
                />
                <Paragraph color="grey-2">
                    When enabled, we pass a one-way SHA-256 hash of your verified account email to our ad provider (NitroPay) to help show more relevant ads. We never send your raw email for this purpose. You can read more in our{' '}
                    <Anchor href="https://www.idleonefficiency.com/privacy-policy" size="small">
                        Privacy Policy
                    </Anchor>
                    .
                </Paragraph>
                {!user.emailVerified && (
                    <Text size="small" color="status-warning">
                        Your account email is not verified, so hashed-email ad personalization is not active.
                    </Text>
                )}
                {!user.email && (
                    <Text size="small" color="status-warning">
                        Your sign-in method did not provide an email address, so this setting has no effect.
                    </Text>
                )}
            </Box>
        </Box>
    );
}

export default ProfileSettings;
