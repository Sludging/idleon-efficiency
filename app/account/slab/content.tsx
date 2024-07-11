"use client"

import {
    Box,
    Text,
    Grid,
    Heading,
    CheckBox
} from 'grommet'
import { useState, useMemo } from 'react';
import TipDisplay, { TipDirection } from '../../../components/base/TipDisplay';
import IconImage from '../../../components/base/IconImage';
import { SourcesModel } from '../../../data/domain/model/sourcesModel';
import { customHandCraftedListOfUnobtainableItems, Slab as SlabDomain } from '../../../data/domain/slab';
import TextAndLabel, { ComponentAndLabel } from '../../../components/base/TextAndLabel';
import { NoteModel } from '../../../data/domain/model/noteModel';
import ShadowBox from '../../../components/base/ShadowBox';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';

function ItemSourcesDisplay({ sources, notes }: { sources: SourcesModel, notes: NoteModel | undefined }) {

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
                    notes ? <Text>{notes.note}</Text> :
                    <>I don&apos;t know yet</>
            }
        </Box>
    )
}

function Slab() {
    const [onlyMissing, setOnlyMissing] = useState<boolean>(false);
    const [onlyLooted, setOnlyLooted] = useState<boolean>(false);
    const theData = useAppDataStore((state) => state.data.getData()); 
    
    const slabInfo = theData.get("slab") as SlabDomain;

    const missingItems = useMemo(() => {
        if (!slabInfo) {
            return [];
        }

        return slabInfo.obtainableItems.filter(item => !item.obtained).filter(item => !customHandCraftedListOfUnobtainableItems.includes(item.internalName));
    }, [slabInfo, theData]);

    const obtainedItems = useMemo(() => {
        if (!slabInfo) {
            return [];
        }

        return slabInfo.obtainableItems.filter(item => item.obtained);
    }, [slabInfo, theData]);

    if (!slabInfo) {
        return <Box>Loading</Box>
    }

    return (
        <Box gap="medium">
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Slab</Heading>
            <ShadowBox background="dark-1" pad="small">
                <Box gap="small" direction="row" wrap>
                    {
                        slabInfo.bonuses.map((bonus, index) => {
                            return (
                                <Box key={index} border={{ color: 'grey-1' }} background="accent-4">
                                    <ShadowBox style={{ opacity: bonus.bonus > 0 ? 1 : 0.5 }} key={index} background="dark-1" pad={"xsmall"}>
                                        <ComponentAndLabel
                                            label={bonus.type}
                                            component={
                                                <Box gap="xsmall" direction="row" align="center">
                                                    <IconImage data={bonus.icon}/>
                                                    <Text size="small">{`+${Math.ceil(bonus.bonus)}%`}</Text>
                                                </Box>
                                            }
                                        />
                                    </ShadowBox>
                                </Box>
                            )
                        })
                    }
                </Box>
            </ShadowBox>
            <Box direction="row" gap="medium">
                <TextAndLabel label="Items Found" text={`${slabInfo.rawObtainedCount}/${slabInfo.obtainableCount}`} />
                <TextAndLabel label="Missing" tooltip={<Text>This is ignoring items that can't be obtained at the moment</Text>} text={`${missingItems.length}`} />
            </Box>
            <Text size="xsmall">*This is fairly accurate, but missing might show items that can&apos;t be obtained.</Text>
            <Box direction="row" gap="small">
                <CheckBox
                    checked={onlyMissing}
                    label="Show only missing"
                    disabled={slabInfo.rawObtainedCount == 0}
                    onChange={(event) => { setOnlyMissing(event.target.checked); setOnlyLooted(false); }}
                />
                <CheckBox
                    checked={onlyLooted}
                    label="Show only looted"
                    disabled={slabInfo.rawObtainedCount == 0}
                    onChange={(event) => { setOnlyLooted(event.target.checked); setOnlyMissing(false); }}
                />
            </Box>
            <Box pad="small">
                <Grid columns={{ size: "36px" }} gap="small">
                    {
                        !onlyMissing && !onlyLooted && slabInfo.obtainableItems.map((item, index) => (
                            <Box key={index} style={{ opacity: item.obtained ? 1 : 0.5 }}>
                                <IconImage data={item.getImageData()} scale={item.getImageData().width > 36 ? 0.5 : 1} />
                            </Box>
                        ))
                    }
                    {
                        onlyMissing && missingItems.map((item, index) => (
                            <Box key={index}>
                                <TipDisplay
                                    heading={`${item.displayName} (${item.type})`}
                                    body={<ItemSourcesDisplay sources={item.sources} notes={item.data.notes} />}
                                    size={"large"}
                                    direction={TipDirection.Down}
                                    maxWidth="large"
                                >
                                    <Box>
                                        <IconImage data={item.getImageData()} scale={item.getImageData().width > 36 ? 0.5 : 1} />
                                    </Box>
                                </TipDisplay>
                            </Box>
                        ))
                    }
                    {
                        onlyLooted && obtainedItems.map((item, index) => (
                            <Box key={index}>
                                <IconImage data={item.getImageData()} scale={item.getImageData().width > 36 ? 0.5 : 1} />
                            </Box>
                        ))
                    }
                </Grid>
            </Box>
        </Box>
    )
}

export default Slab;