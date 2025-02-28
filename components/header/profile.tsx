"use client"

import Link from 'next/link';
import { useContext, useState } from "react";
import { AuthStatus } from "../../data/firebase/authContext";
import { Avatar, Box, Button, DropButton, Stack, ThemeContext, ThemeType } from "grommet";
import { CaretDownFill } from "grommet-icons";
import { normalizeColor } from "grommet/utils";
import { useAuthStore } from '../../lib/providers/authStoreProvider';
import { DataStatus } from '../../lib/stores/appDataStore';
import { useAppDataStore } from '../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow'
import TextAndLabel from '../base/TextAndLabel';
import { UserCircle } from '@phosphor-icons/react';

export const Profile = () => {
    const { authStatus, logout } = useAuthStore(
        useShallow((state) => ({ authStatus: state.authStatus, logout: state.logout })),
    )
    const {
        profile,
        dataStatus,
        hasUnseenChangelogs,
    } = useAppDataStore(
        useShallow((state) => ({
            profile: state.profile,
            dataStatus: state.dataStatus,
            hasUnseenChangelogs: state.hasUnseenChangelogs,
        }))
    )
    const theme = useContext<ThemeType>(ThemeContext);

    const [profileDropDownOpen, setProfileDropDownOpen] = useState<boolean>(false);

    const onButtonClick = (toCall: Function | undefined, value?: string) => {
        try {
            if (toCall) {
                if (value) {
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
    }

    if (authStatus == AuthStatus.Valid) {
        return (
            <Box direction="row">
                <DropButton
                    plain={true}
                    label={
                        <Box style={{ position: 'relative' }}>
                            <Avatar direction='row'>
                                <Stack anchor='top-right'>
                                    <UserCircle color={normalizeColor("accent-3", theme)} size={"32px"} />
                                    {hasUnseenChangelogs && <Box margin={{ right: '-2px' }} fill background="status-critical" round="full" pad="xxsmall" width="8px" height="8px" />}
                                </Stack>
                                <CaretDownFill size="small" />
                            </Avatar>
                        </Box>
                    }
                    open={profileDropDownOpen}
                    title='Manage Profile'
                    dropAlign={{ top: 'bottom', right: 'right' }}
                    dropProps={{
                        plain: true,
                        elevation: 'navigation',
                        background: 'dark-2',
                        round: "small",
                        onClickOutside: () => setProfileDropDownOpen(false),
                        onEsc: () => setProfileDropDownOpen(false),
                    }}
                    onClick={() => setProfileDropDownOpen(true)}
                    dropContent={
                        <Box width="small" border={{ color: 'grey-1' }} round="small">
                            {dataStatus == DataStatus.LiveData &&
                                <Link href={'https://www.idleonefficiency.com/profile/upload'} legacyBehavior>
                                    <Button onClick={() => setProfileDropDownOpen(false)} hoverIndicator={{ color: 'brand', size: 'large' }} color="accent-2">
                                        <Box align="center" pad="small">Public Profile</Box>
                                    </Button>
                                </Link>
                            }
                            <Link href={'https://www.idleonefficiency.com/changelog'} legacyBehavior>
                                <Button onClick={() => setProfileDropDownOpen(false)} hoverIndicator={{ color: 'brand', size: 'large' }} color="accent-2">
                                    <Box direction="row" justify="center" gap="small" align="center" pad="small">
                                        Change log
                                        {hasUnseenChangelogs && <Box background="status-critical" round="full" pad="xxsmall" width="8px" height="8px" />}
                                    </Box>
                                </Button>
                            </Link>
                            <Box border={{ color: 'grey-1' }} fill />
                            <Button hoverIndicator={{ color: 'brand', size: 'large' }} color="accent-2" onClick={() => { onButtonClick(logout); setProfileDropDownOpen(false) }}>
                                <Box pad="small">Sign Out</Box>
                            </Button>
                        </Box>
                    }
                />
            </Box>
        )
    }

    if (dataStatus == DataStatus.StaticData) {
        return (
            <Box direction="row" gap="small">
                <TextAndLabel textColor='accent-3' textSize='xsmall' labelSize='xsmall' label="Public Profile" text={profile} />
                <DropButton
                    plain={true}
                    label={
                        <Box style={{ position: 'relative' }}>
                            <Avatar direction='row'>
                                <Stack anchor='top-right'>
                                    <UserCircle color={normalizeColor("accent-3", theme)} size={"32px"} />
                                    {hasUnseenChangelogs && <Box margin={{ right: '-2px' }} fill background="status-critical" round="full" pad="xxsmall" width="8px" height="8px" />}
                                </Stack>
                                <CaretDownFill size="small" />
                            </Avatar>
                        </Box>
                    }
                    open={profileDropDownOpen}
                    title='Menu'
                    dropAlign={{ top: 'bottom', right: 'right' }}
                    dropProps={{
                        plain: true,
                        elevation: 'navigation',
                        background: 'dark-2',
                        round: "small",
                        onClickOutside: () => setProfileDropDownOpen(false),
                        onEsc: () => setProfileDropDownOpen(false),
                    }}
                    onClick={() => setProfileDropDownOpen(true)}
                    dropContent={
                        <Box width="small" border={{ color: 'grey-1' }} round="small">
                            <Link href={'https://www.idleonefficiency.com/changelog'} legacyBehavior>
                                <Button onClick={() => setProfileDropDownOpen(false)} hoverIndicator={{ color: 'brand', size: 'large' }} color="accent-2">
                                    <Box direction="row" justify="center" gap="small" align="center" pad="small">
                                        Change log
                                        {hasUnseenChangelogs && <Box background="status-critical" round="full" pad="xxsmall" width="8px" height="8px" />}
                                    </Box>
                                </Button>
                            </Link>
                        </Box>
                    }
                />
            </Box>
        )
    }
}