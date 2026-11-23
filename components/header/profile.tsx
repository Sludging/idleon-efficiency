"use client"

import Link from 'next/link';
import { useContext, useState } from "react";
import { AuthStatus } from "../../data/firebase/authContext";
import { Avatar, Box, Button, DropButton, Layer, Stack, Text, ThemeContext, ThemeType } from "grommet";
import { Add, CaretDownFill, Checkmark, Close } from "grommet-icons";
import { normalizeColor } from "grommet/utils";
import { useAuthStore } from '../../lib/providers/authStoreProvider';
import { DataStatus } from '../../lib/stores/appDataStore';
import { useAppDataStore } from '../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow'
import TextAndLabel from '../base/TextAndLabel';
import { UserCircleIcon } from '@phosphor-icons/react/dist/csr/UserCircle';
import LoginForm from '../login/loginForm';

export const Profile = () => {
    const {
        authStatus,
        accounts,
        activeAccountId,
        logout,
        logoutAll,
        switchAccount,
        removeAccount,
        clearError,
    } = useAuthStore(
        useShallow((state) => ({
            authStatus: state.authStatus,
            accounts: state.accounts,
            activeAccountId: state.activeAccountId,
            logout: state.logout,
            logoutAll: state.logoutAll,
            switchAccount: state.switchAccount,
            removeAccount: state.removeAccount,
            clearError: state.clearError,
        })),
    )
    const {
        profile,
        dataStatus,
        hasUnseenChangelogs,
        activeFirstCharName,
    } = useAppDataStore(
        useShallow((state) => {
            const playerNames = state.data.getData().get("playerNames") as string[] | undefined;
            return {
                profile: state.profile,
                dataStatus: state.dataStatus,
                hasUnseenChangelogs: state.hasUnseenChangelogs,
                activeFirstCharName: playerNames?.[0],
                lastUpdated: state.lastUpdated,
            };
        })
    )
    const theme = useContext<ThemeType>(ThemeContext);

    const [profileDropDownOpen, setProfileDropDownOpen] = useState<boolean>(false);
    const [showAddAccountModal, setShowAddAccountModal] = useState<boolean>(false);

    const activeAccount = accounts.find((account) => account.id === activeAccountId);
    const activeAccountLabel = activeFirstCharName || activeAccount?.firstCharName || "";

    const getAccountDisplayName = (accountId: string, storedName?: string): string => {
        if (accountId === activeAccountId && activeAccountLabel) {
            return activeAccountLabel;
        }
        return storedName || "Account";
    };

    const openAddAccountModal = () => {
        clearError();
        setProfileDropDownOpen(false);
        setShowAddAccountModal(true);
    };

    const closeAddAccountModal = () => {
        clearError();
        setShowAddAccountModal(false);
    };

    if (authStatus == AuthStatus.Valid) {
        return (
            <Box direction="row" gap="small" align="center">
                {activeAccountLabel && (
                    <TextAndLabel
                        textColor="accent-2"
                        textSize="xsmall"
                        labelSize="xsmall"
                        label="Account"
                        text={activeAccountLabel}
                    />
                )}
                <DropButton
                    plain={true}
                    label={
                        <Box style={{ position: 'relative' }}>
                            <Avatar direction='row'>
                                <Stack anchor='top-right'>
                                    <UserCircleIcon color={normalizeColor("accent-3", theme)} size={"32px"} />
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
                        <Box width={{ min: '220px', max: '260px' }} border={{ color: 'grey-1' }} round="small">
                            <Box pad={{ horizontal: 'small', top: 'small', bottom: 'xsmall' }}>
                                <Text size="xsmall" color="accent-3">Accounts</Text>
                            </Box>
                            {accounts.map((account) => {
                                const isActive = account.id === activeAccountId;
                                const displayName = getAccountDisplayName(account.id, account.firstCharName);

                                return (
                                    <Box
                                        key={account.id}
                                        direction="row"
                                        align="center"
                                        justify="between"
                                        background={isActive ? 'dark-1' : undefined}
                                    >
                                        <Button
                                            plain
                                            fill="horizontal"
                                            hoverIndicator={{ color: 'brand', size: 'large' }}
                                            onClick={() => {
                                                setProfileDropDownOpen(false);
                                                if (!isActive) {
                                                    switchAccount(account.id);
                                                }
                                            }}
                                        >
                                            <Box direction="row" align="center" gap="small" pad={{ horizontal: 'small', vertical: 'xsmall' }}>
                                                <Box width="14px" align="center" justify="center">
                                                    {isActive && <Checkmark size="small" color="green-2" />}
                                                </Box>
                                                <Text size="small" color={isActive ? 'white-2' : 'accent-2'} truncate>
                                                    {displayName}
                                                </Text>
                                            </Box>
                                        </Button>
                                        {!isActive && (
                                            <Button
                                                plain
                                                title={`Sign out ${displayName}`}
                                                hoverIndicator={{ color: 'grey-1' }}
                                                onClick={() => removeAccount(account.id)}
                                            >
                                                <Box pad={{ horizontal: 'xsmall', vertical: 'xsmall' }}>
                                                    <Close size="12px" color="accent-3" />
                                                </Box>
                                            </Button>
                                        )}
                                    </Box>
                                );
                            })}
                            <Button
                                hoverIndicator={{ color: 'brand', size: 'large' }}
                                color="accent-2"
                                onClick={openAddAccountModal}
                            >
                                <Box direction="row" align="center" justify="center" gap="xsmall" pad="small">
                                    <Add size="small" />
                                    <Text size="small">Add Account</Text>
                                </Box>
                            </Button>
                            <Box border={{ color: 'grey-1', side: 'bottom' }} fill="horizontal" />
                            {dataStatus == DataStatus.LiveData &&
                                <>
                                    <Link prefetch={false} href={'https://www.idleonefficiency.com/profile/upload'}>
                                        <Button onClick={() => setProfileDropDownOpen(false)} hoverIndicator={{ color: 'brand', size: 'large' }} color="accent-2">
                                            <Box align="center" pad="small">Public Profile</Box>
                                        </Button>
                                    </Link>
{/*                                     <Link prefetch={false} href={'https://www.idleonefficiency.com/profile/settings'}>
                                        <Button onClick={() => setProfileDropDownOpen(false)} hoverIndicator={{ color: 'brand', size: 'large' }} color="accent-2">
                                            <Box align="center" pad="small">Settings</Box>
                                        </Button>
                                    </Link> */}
                                </>
                            }
                            <Link prefetch={false} href={'https://www.idleonefficiency.com/changelog'}>
                                <Button onClick={() => setProfileDropDownOpen(false)} hoverIndicator={{ color: 'brand', size: 'large' }} color="accent-2">
                                    <Box direction="row" justify="center" gap="small" align="center" pad="small">
                                        Change log
                                        {hasUnseenChangelogs && <Box background="status-critical" round="full" pad="xxsmall" width="8px" height="8px" />}
                                    </Box>
                                </Button>
                            </Link>
                            <Box border={{ color: 'grey-1', side: 'bottom' }} fill="horizontal" />
                            <Button
                                hoverIndicator={{ color: 'brand', size: 'large' }}
                                color="accent-2"
                                onClick={() => {
                                    setProfileDropDownOpen(false);
                                    logout();
                                }}
                            >
                                <Box pad="small">Sign Out</Box>
                            </Button>
                            {accounts.length > 1 && (
                                <Button
                                    hoverIndicator={{ color: 'brand', size: 'large' }}
                                    color="accent-2"
                                    onClick={() => {
                                        setProfileDropDownOpen(false);
                                        logoutAll();
                                    }}
                                >
                                    <Box pad="small">Sign Out All</Box>
                                </Button>
                            )}
                        </Box>
                    }
                />
                {showAddAccountModal && (
                    <Layer
                        onEsc={closeAddAccountModal}
                        onClickOutside={closeAddAccountModal}
                        modal={true}
                        position="center"
                    >
                        <Box width={{ max: '900px' }} background="dark-2" round="small">
                            <LoginForm
                                addAccount
                                onSuccess={closeAddAccountModal}
                                onCancel={closeAddAccountModal}
                            />
                        </Box>
                    </Layer>
                )}
            </Box>
        );
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
                                    <UserCircleIcon color={normalizeColor("accent-3", theme)} size={"32px"} />
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
                            <Link prefetch={false} href={'https://www.idleonefficiency.com/changelog'}>
                                {/* @next-codemod-error This Link previously used the now removed `legacyBehavior` prop, and has a child that might not be an anchor. The codemod bailed out of lifting the child props to the Link. Check that the child component does not render an anchor, and potentially move the props manually to Link. */
                                }
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
        );
    }

    return null;
}
