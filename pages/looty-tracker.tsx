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
            return `icons icons-${rawName}`;
        }
        if (getRegex().exec(rawName)) {
            return `icons-2836 icons-${rawName}`;
        }
        return `icons icons-${rawName}_x1`;
    }

    const getStyle = (rawName: string, opacity: number = 1) => {
        if (getRegex().exec(rawName)) {
            return { opacity: opacity };
        }

        return { width: "36px", height: "36px", backgroundPosition: "0 calc(var(--row) * -36px)", opacity: opacity }
    }

    useEffect(() => {
        setlootyInfo(idleonData.getData().get("lootyData") as LootyInfo);

    }, [idleonData]);
    return (
        <Box gap="medium">
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Looty Tracker</Heading>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>THIS IS VERY INACCURATE AT THE MOMENT - Actively worked on to make it better!</Heading>
            <Text size="large">If you see an item that on hover says &apos;FILLER&apos; or a red &apos;MISSING ICON&apos;, ignore it for now.</Text>
            <Box direction="row" gap="medium">
                {/* <Text>Total Items = {lootyInfo?.obtainable.length}</Text> */}
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
                        !onlyMissing && !onlyLooted && lootyInfo.obtainable.map(([rawName, displayName], index) => (
                            <Box title={displayName} style={getStyle(rawName, lootyInfo.isLooted(rawName) ? 1 : 0.5)} key={index} className={getClass(rawName)} />
                            ))
                        }
                        {
                        onlyMissing && lootyInfo.missing.map(([rawName, displayName], index) => (
                            <Box>
                            <Box title={displayName} style={getStyle(rawName)} key={index} className={getClass(rawName)} />
                            </Box>
                        ))
                    }
                    {
                        onlyLooted && lootyInfo.obtained.map(([rawName, displayName], index) => (
                            <Box title={displayName} style={getStyle(rawName)} key={index} className={getClass(rawName)} />
                            ))
                        }
                    </Grid>
                }
            </Box>
        </Box>
    )
}

export default LootyTracker;