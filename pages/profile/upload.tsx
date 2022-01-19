import {
    Anchor,
    Box,
    Button,
    CheckBox,
    Heading,
    Notification,
    Paragraph,
    Spinner,
    StatusType,
    Text
} from 'grommet'
import { useState, useEffect, useContext, useMemo } from 'react';
import { AppContext } from '../../data/appContext'
import { NextSeo } from 'next-seo';
import { ProfileStorage } from '../../data/storage/profiles';
import { AuthContext } from '../../data/firebase/authContext';
import TipDisplay, { TipDirection } from '../../components/base/TipDisplay';
import { CircleInformation } from 'grommet-icons';
import { dateToIntString } from '../../data/utility';
import { ComponentAndLabel } from '../../components/base/TextAndLabel';
import { TimeDown } from '../../components/base/TimeDisplay';

function UploadProfile() {
    const authContext = useContext(AuthContext);
    const appContext = useContext(AppContext);

    const [uploadSensitiveData, setUploadSensitiveData] = useState<boolean>(false);
    const [lastUpload, setLastUpload] = useState<Date | undefined>(undefined);
    const [uploading, setUploading] = useState<boolean>(false);
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastStatus, setToastStatus] = useState<StatusType | undefined>("unknown");
    const [toastMessage, setToastMessage] = useState<string>("");

    const firstCharName = useMemo(() => {
        const theData = appContext.data.getData();
        const playerNames = theData.get('playerNames') as string[];
        if (playerNames) {
            return playerNames[0];
        }
        return undefined;
    }, [appContext]);

    const secondsSinceLastUpload = useMemo(() => {
        if (!lastUpload) {
            return 0;
        }

        return (new Date().getTime() - lastUpload.getTime()) / 1000;
    }, [lastUpload]);

    const uploadData = async () => {
        const user = authContext?.user;
        if (user) {
            setUploading(true);
            const uploadRes = await ProfileStorage.uploadProfile(appContext.data, user, !uploadSensitiveData);
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

    useEffect(() => {
        const user = authContext?.user;
        if (user) {
            const localDate = localStorage.getItem(`${user.uid}/last_profile_upload`);
            if (localDate) {
                setLastUpload(new Date(localDate));
            }
        }
    }, [appContext, authContext, showToast])

    if (!authContext?.user) {
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
            <NextSeo title="User Profile - Upload Public Profile" />
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Public Profile</Heading>
            { showToast && 
                <Notification 
                    toast
                    title="Upload Result"
                    message={toastMessage}
                    status={toastStatus}
                    onClose={() => { setShowToast(false); setToastMessage("")}}
                />
            }
            <Box width="large" margin={{ bottom: 'medium' }}>
                <Text>This page allows you to manage your public profile stored on the Idleon Efficiency servers.</Text>
                {lastUpload == undefined && <Text>The profile will be available under {encodeURIComponent(firstCharName.toLowerCase())}.idleonefficiency.com once uploaded.</Text>}
                {lastUpload != undefined && <Text>Your profile is available under <Anchor href={`https://${encodeURIComponent(firstCharName.toLowerCase())}.idleonefficiency.com`} target='_blank'>https://{encodeURIComponent(firstCharName.toLowerCase())}.idleonefficiency.com</Anchor></Text>}
            </Box>
            <Box gap="small">
                <Text>You can update your profile once every 4 hours.</Text>
                {lastUpload != undefined &&
                    <Box gap="small">
                        <Text size="small">Last Updated on: {dateToIntString(lastUpload)}</Text>
                        <ComponentAndLabel
                            label={"Time till your next upload"}
                            component={
                                <TimeDown lastUpdated={lastUpload} addSeconds={14400} />
                            }
                        />
                    </Box>
                }

                <CheckBox
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
                                <Text size="xsmall">* This will not remove gem store data, as that's important for some maths like capacity.</Text>
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
                />
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