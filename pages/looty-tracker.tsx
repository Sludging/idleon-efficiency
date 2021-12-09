import {
    Box,
    Text,
    Grid,
    Heading,
    CheckBox
} from 'grommet'
import { useState, useEffect, useContext, useMemo } from 'react';
import { AppContext } from '../data/appContext'
import { LootyInfo } from '../data/domain/lootyTracker';
import { ItemSources, ItemSource, DropInfo } from '../data/domain/items';
import { NextSeo } from 'next-seo';
import TipDisplay, { TipDirection } from '../components/base/TipDisplay';

const getRegex = () => { return /Cards(\w)(\d+)/g };
const getEnhancerRegex = () => { return /DungEnhancer(\d+)/g };


function ItemSourcesDisplay({ sources, dropInfo }: { sources: ItemSources, dropInfo: DropInfo}) {

    const possibleSources = useMemo(() => { 
        if (!sources) {
            return []
        }

        const fromSources = sources.sources.map(x => x.txtName);
        const fromRecipe = sources.recipeFrom.map(x => x.txtName);
        const fromQuests = sources.questAss.map(x => x.txtName);
        return Array.from(new Set([...fromSources, ...fromRecipe, ...fromQuests]));
    }, [sources]);


    return (
        <Box>
            <Text size="medium">Obtain From:</Text>
            {
                possibleSources.length > 0 ? 
                <Box>
                    
                    {
                        possibleSources.map((source, index) => (
                            <Text size="small" key={index}>{source}</Text>
                        ))
                    }
                </Box> :
                <>I don&apos;t know yet</>
            }
        </Box>
    )
}

function LootyTracker() {
    const [lootyInfo, setlootyInfo] = useState<LootyInfo>();
    const [onlyMissing, setOnlyMissing] = useState<boolean>(false);
    const [onlyLooted, setOnlyLooted] = useState<boolean>(false);
    const idleonData = useContext(AppContext);

    const getClass = (rawName: string) => {
        if (getEnhancerRegex().exec(rawName)) {
            return `icons-3434 icons-${rawName}_x1`;
        }
        if (getRegex().exec(rawName)) {
            return `icons-2836 icons-${rawName}`;
        }
        // Cons dem for some reason has capital x.
        if (rawName == "ObolPinkCons") {
            return `icons-3636 icons-${rawName}_X1`;    
        }
        // 35 doesn't have an image for some reason.
        if (rawName == "StampA35") {
            return `icons-3636 icons-StampA34_x1`;    
        }
        return `icons-3636 icons-${rawName}_x1`;
    }

    const getWidth = (rawName: string) => {
        if (getEnhancerRegex().exec(rawName)) {
            return `34px`;
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
                                <Box title={item.displayName} key={index} width={{ max: getWidth(item.internalName) }} >
                                    <Box style={{ opacity: lootyInfo.isLooted(item.internalName) ? 1 : 0.5 }} className={getClass(item.internalName)} />
                                </Box>
                            ))
                        }
                        {
                            onlyMissing && lootyInfo.missing.map((item, index) => (
                                <Box key={index}>
                                    <TipDisplay
                                        heading={`${item.displayName} (${item.type})`}
                                        body={<ItemSourcesDisplay sources={item.sources} dropInfo={item.dropInfo} />}
                                        size={"large"}
                                        direction={TipDirection.Down}
                                        maxWidth="large"
                                    >
                                        <Box width={{ max: getWidth(item.internalName) }}>
                                            <Box className={getClass(item.internalName)} />
                                        </Box>
                                    </TipDisplay>
                                </Box>
                            ))
                        }
                        {
                            onlyLooted && lootyInfo.obtained.map((item, index) => (
                                <Box title={item.displayName} width={{ max: getWidth(item.internalName) }} key={index}>
                                    <Box className={getClass(item.internalName)} />
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