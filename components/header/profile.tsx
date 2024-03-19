"use client"

import Link from 'next/link';
import { useContext, useState } from "react";
import { AuthStatus } from "../../data/firebase/authContext";
import { Avatar, Box, Button, DropButton, ThemeContext, ThemeType } from "grommet";
import { CaretDownFill, User } from "grommet-icons";
import { normalizeColor } from "grommet/utils";
import { AppContext, DataStatus } from '../../data/appContext';
import TextAndLabel from '../base/TextAndLabel';
import { useAuthStore } from '../../lib/providers/authStoreProvider';

export const Profile = () => {
    const { authStatus, logout } = useAuthStore(
        (state) => state,
    )
    const appContext = useContext(AppContext);
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

    console.log("Profile [Render]", AuthStatus[authStatus]);

    if (authStatus == AuthStatus.Valid) {
        return (
            <Box direction="row">
                <DropButton
                    plain={true}
                    label={
                        <Avatar direction='row'>
                            <User color={normalizeColor("accent-3", theme)} size={"24px"} />
                            <CaretDownFill size="small" />
                        </Avatar>
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
                            {appContext.dataStatus == DataStatus.LiveData && <Link href={'/profile/upload'} legacyBehavior>
                                <Button onClick={() => setProfileDropDownOpen(false)} hoverIndicator={{ color: 'brand', size: 'large' }} color="accent-2">
                                    <Box pad="small">Public Profile</Box>
                                </Button>
                            </Link>
                            }
                            < Box border={{ color: 'grey-1' }} fill />
                            <Button hoverIndicator={{ color: 'brand', size: 'large' }} color="accent-2" onClick={() => { onButtonClick(logout); setProfileDropDownOpen(false) }}>
                                <Box pad="small">Sign Out</Box>
                            </Button>
                        </Box>
                    }
                />
            </Box>
        )
    }

    if (appContext.dataStatus == DataStatus.StaticData) {
        return (
            <TextAndLabel textColor='accent-3' textSize='xsmall' labelSize='xsmall' label="Public Profile" text={appContext.profile} />
        )
    }
}