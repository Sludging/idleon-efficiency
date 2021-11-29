import {
    Box,
    Text,
    Grid,
    Heading,
    CheckBox
} from 'grommet'
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../data/appContext'
import { LootyInfo } from '../data/domain/lootyTracker';
import { NextSeo } from 'next-seo';
import TipDisplay, { TipDirection } from '../components/base/TipDisplay';

const getRegex = () => { return /Cards(\w)(\d+)/g };
const getEnhancerRegex = () => { return /DungEnhancer(\d+)/g };

function LootyTracker() {
    const [lootyInfo, setlootyInfo] = useState<LootyInfo>();
    const [onlyMissing, setOnlyMissing] = useState<boolean>(false);
    const [onlyLooted, setOnlyLooted] = useState<boolean>(false);
    const idleonData = useContext(AppContext);

    const getClass = (rawName: string) => {
        if (getEnhancerRegex().exec(rawName)) {
            return `icons-3434 icons-${rawName}_x1`;
        }
        if (rawName == "StampC5") {
            return `icons-3636 icons-${rawName}`;
        }
        if (getRegex().exec(rawName)) {
            return `icons-2836 icons-${rawName}`;
        }
        return `icons-3636 icons-${rawName}_x1`;
    }

    const getWidth = (rawName: string) => {
        if (getEnhancerRegex().exec(rawName)) {
            return `34px`;
        }
        if (rawName == "StampC5") {
            return `36px`;
        }
        if (getRegex().exec(rawName)) {
            return `28px`;
        }
        return `36px`;
    }
    useEffect(() => {
        setlootyInfo(idleonData.getData().get("lootyData") as LootyInfo);

    }, [idleonData]);
    return (
        <Box gap="medium">
            <NextSeo title="Looty Tracker" />
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Looty Tracker</Heading>
            <Text size="large">This is fairly accurate, but missing might show items that can&apos;t be obtained.</Text>
            <Box direction="row" gap="medium">
                <Text>Already lootyed = {lootyInfo?.obtained.length}</Text>
                <Text>Missing = {lootyInfo?.missing.length}</Text>
            </Box>
            <Box direction="row" gap="small">
                <CheckBox
                    checked={onlyMissing}
                    label="Show only missing"
                    onChange={(event) => { setOnlyMissing(event.target.checked); setOnlyLooted(false); }}
                />
                <CheckBox
                    checked={onlyLooted}
                    label="Show only looted"
                    onChange={(event) => { setOnlyLooted(event.target.checked); setOnlyMissing(false); }}
                />
            </Box>
            <Box pad="small">
                {lootyInfo &&
                    <Grid columns={{ size: "36px" }} gap="small">
                        {
                            !onlyMissing && !onlyLooted && lootyInfo.obtainable.map((item, index) => (
                                <Box key={index} width={{ max: getWidth(item.internalName) }} >
                                    <Box title={item.displayName} style={{ opacity: lootyInfo.isLooted(item.internalName) ? 1 : 0.5 }} className={getClass(item.internalName)} />
                                </Box>
                            ))
                        }
                        {
                            onlyMissing && lootyInfo.missing.map((item, index) => (
                                <Box key={index}>
                                    <TipDisplay
                                        heading={`${item.displayName} (${item.type})`}
                                        body={item.getDrops()}
                                        size={"large"}
                                        direction={TipDirection.Down}
                                        maxWidth="large"
                                    >
                                        <Box width={{ max: getWidth(item.internalName) }}>
                                            <Box title={item.displayName} className={getClass(item.internalName)} />
                                        </Box>
                                    </TipDisplay>
                                </Box>
                            ))
                        }
                        {
                            onlyLooted && lootyInfo.obtained.map((item, index) => (
                                <Box width={{ max: getWidth(item.internalName) }} key={index}>
                                    <Box title={item.displayName} className={getClass(item.internalName)} />
                                </Box>
                            ))
                        }
                    </Grid>
                }
            </Box>
        </Box>
    )
}

export default LootyTracker;