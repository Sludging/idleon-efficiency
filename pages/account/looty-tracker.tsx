import {
    Box,
    Text,
    Grid,
    Heading,
    CheckBox
} from 'grommet'
import { useState, useEffect, useContext, useMemo } from 'react';
import { AppContext } from '../../data/appContext'
import { LootyInfo } from '../../data/domain/lootyTracker';
import { NextSeo } from 'next-seo';
import TipDisplay, { TipDirection } from '../../components/base/TipDisplay';
import IconImage from '../../components/base/IconImage';
import { SourcesModel } from '../../data/domain/model/sourcesModel';

const getRegex = () => { return /Cards(\w)(\d+)/g };
const getEnhancerRegex = () => { return /DungEnhancer(\d+)/g };


function ItemSourcesDisplay({ sources }: { sources: SourcesModel }) {

    const possibleSources = useMemo(() => {
        if (!sources) {
            return []
        }

        const fromSources = sources.sources ? sources.sources.map(x => x.txtName) : [];
        const fromRecipe = sources.recipeFrom ? sources.recipeFrom.map(x => x.txtName) : [];
        const fromQuests = sources.questAss ? sources.questAss.map(x => x.txtName) : [];
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
    const appContext = useContext(AppContext);

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
        setlootyInfo(appContext.data.getData().get("lootyData") as LootyInfo);

    }, [appContext]);
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
                                <Box key={index} style={{ opacity: lootyInfo.isLooted(item.internalName) ? 1 : 0.5 }} width={{ max: getWidth(item.internalName) }}>
                                    <IconImage data={item.getImageData()} scale={item.getImageData().width > 36 ? 0.5 : 1} />
                                </Box>
                            ))
                        }
                        {
                            onlyMissing && lootyInfo.missing.map((item, index) => (
                                <Box key={index}>
                                    <TipDisplay
                                        heading={`${item.displayName} (${item.type})`}
                                        body={<ItemSourcesDisplay sources={item.sources} />}
                                        size={"large"}
                                        direction={TipDirection.Down}
                                        maxWidth="large"
                                    >
                                        <Box width={{ max: getWidth(item.internalName) }}>
                                            <IconImage data={item.getImageData()} scale={item.getImageData().width > 36 ? 0.5 : 1} />
                                        </Box>
                                    </TipDisplay>
                                </Box>
                            ))
                        }
                        {
                            onlyLooted && lootyInfo.obtained.map((item, index) => (
                                <Box key={index} width={{ max: getWidth(item.internalName) }}>
                                    <IconImage data={item.getImageData()} scale={item.getImageData().width > 36 ? 0.5 : 1} />
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