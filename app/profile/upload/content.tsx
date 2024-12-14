"use client"

import {
    Anchor,
    Box,
    Button,
    Heading,
    Notification,
    Paragraph,
    Spinner,
    StatusType,
    Text
} from 'grommet'
import { useState, useEffect, useMemo } from 'react';
import { ProfileUploader } from '../../../data/storage/profiles';
import TipDisplay, { TipDirection } from '../../../components/base/TipDisplay';
import { CircleInformation } from 'grommet-icons';
import { dateToIntString } from '../../../data/utility';
import { ComponentAndLabel } from '../../../components/base/TextAndLabel';
import { TimeDown } from '../../../components/base/TimeDisplay';
import { useAuthStore } from '../../../lib/providers/authStoreProvider';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';


function UploadProfile() {
    const { user } = useAuthStore(
        (state) => state,
    )
    const { theData, data } = useAppDataStore(
        useShallow((state) => ({
            theData: state.data.getData(),
            data: state.data,
            lastUpdated: state.lastUpdated,
        })));

    const [uploadSensitiveData, setUploadSensitiveData] = useState<boolean>(false);
    const [lastUpload, setLastUpload] = useState<Date | undefined>(undefined);
    const [uploading, setUploading] = useState<boolean>(false);
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastStatus, setToastStatus] = useState<StatusType | undefined>("unknown");
    const [toastMessage, setToastMessage] = useState<string>("");

    const firstCharName = useMemo(() => {
        const playerNames = theData.get('playerNames') as string[];
        if (playerNames) {
            return playerNames[0];
        }
        return undefined;
    }, [theData, data]);

    const secondsSinceLastUpload = useMemo(() => {
        if (!lastUpload) {
            return 0;
        }

        return (new Date().getTime() - lastUpload.getTime()) / 1000;
    }, [lastUpload]);

    const uploadData = async () => {
        if (user) {
            setUploading(true);
            const uploader = new ProfileUploader();
            const uploadRes = await uploader.uploadProfile(data, user, !uploadSensitiveData);
            let message = "";
            if (uploadRes.success) {
                localStorage.setItem(`${user.uid}/last_profile_upload`, new Date().toISOString());
                message = `Successfully uploaded the profile`;
                setToastStatus('normal');
            }
            else {
                message = `Error occured: ${uploadRes.error}`;
                setToastStatus('warning');
            }
            setUploading(false);
            setToastMessage(message);
            setShowToast(true);
        }
    }

    const timeSinceLastUpload = useMemo(() => {
        const time = new Date();
        return time.getTime() - (lastUpload?.getTime() ?? 0);
    }, [lastUpload]);

    useEffect(() => {
        if (user) {
            const localDate = localStorage.getItem(`${user.uid}/last_profile_upload`);
            if (localDate) {
                setLastUpload(new Date(localDate));
            }
        }
    }, [user])

    if (!user) {
        <Box align="center" pad="medium">
            <Heading level='3'>Go Away, you aren&apos;t logged in.</Heading>
        </Box>
    }

    if (!firstCharName) {
        return (
            <Box align="center" pad="medium">
                <Heading level='3'>Fetching info</Heading>
            </Box>
        )
    }

    return (
        <Box>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Public Profile</Heading>
            {showToast &&
                <Notification
                    toast
                    title="Upload Result"
                    message={toastMessage}
                    status={toastStatus}
                    onClose={() => { setShowToast(false); setToastMessage("") }}
                />
            }
            <Box width="large" margin={{ bottom: 'small' }}>
                <Text>This page allows you to manage your public profile stored on the Idleon Efficiency servers.</Text>
                {lastUpload == undefined && <Text>The profile will be available under {encodeURIComponent(firstCharName.toLowerCase())}.idleonefficiency.com once uploaded.</Text>}
                {lastUpload != undefined && <Text>Your profile is available under <Anchor href={`https://${encodeURIComponent(firstCharName.toLowerCase())}.idleonefficiency.com`} target='_blank'>https://{encodeURIComponent(firstCharName.toLowerCase())}.idleonefficiency.com</Anchor></Text>}
            </Box>
            <Box direction="row" gap="small" align="center" margin={{ bottom: 'medium' }}>
                <Text size="small">* gem related information will not be uploaded</Text>
                <TipDisplay
                    body={<Box gap="xsmall">
                        <Paragraph>
                            This will remove data containing information about the number of gems you have or previously bought.
                            It will also remove information about bundles you purchased.
                        </Paragraph>
                        <Text size="xsmall">* This will not remove premium items, so they will still be visible on looty and other places.</Text>
                        <Text size="xsmall">* This will not remove gem store data, as that&apos;s important for some maths like capacity.</Text>
                    </Box>}
                    size="small"
                    heading='What will be removed?'
                    maxWidth='medium'
                    direction={TipDirection.Down}
                >
                    <CircleInformation size="small" />
                </TipDisplay>
            </Box>
            <Box gap="small">
                <Text>You can update your profile once every 4 hours.</Text>
                {lastUpload != undefined &&
                    <Box gap="small">
                        <Text size="small">Last Updated on: {dateToIntString(lastUpload)}</Text>
                        <ComponentAndLabel
                            label={"Time till your next upload"}
                            component={
                                <TimeDown addSeconds={14400 - (timeSinceLastUpload / 1000)} />
                            }
                        />
                    </Box>
                }
                {/* <CheckBox
                    checked={uploadSensitiveData}
                    label={<Box direction="row" align="center">
                        <Text margin={{ right: 'xsmall' }} size="small">Upload gem related information?</Text>
                        <TipDisplay
                            body={<Box gap="xsmall">
                                <Paragraph>
                                    This will remove data containing information about the number of gems you have or previously bought.
                                    It will also remove information about bundles you purchased.
                                </Paragraph>
                                <Text size="xsmall">* This will not remove premium items, so they will still be visible on looty and other places.</Text>
                                <Text size="xsmall">* This will not remove gem store data, as that&apos;s important for some maths like capacity.</Text>
                            </Box>}
                            size="small"
                            heading='What will be removed?'
                            maxWidth='medium'
                            direction={TipDirection.Down}
                        >
                            <CircleInformation size="small" />
                        </TipDisplay>
                    </Box>}
                    onChange={(event) => setUploadSensitiveData(event.target.checked)}
                /> */}
                <Box width="medium" direction="row" align="center" gap="small">
                    <Button primary color='brand' label="Upload" disabled={uploading || (secondsSinceLastUpload > 0 && secondsSinceLastUpload < 14400)} onClick={() => uploadData()} />
                    {uploading &&
                        <Box direction="row" gap="small">
                            <Text size="xsmall">Upload in progress, please wait.</Text>
                            <Spinner />
                        </Box>
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default UploadProfile;