import {
    Box,
    Grid,
    Heading,
    Text,
} from "grommet"

import { useContext, useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import TabButton from "../../components/base/TabButton";
import { AppContext } from "../../data/appContext";
import { dungeonLevels, Dungeons, DungeonSetInfo, PassiveType } from "../../data/domain/dungeons";
import TipDisplay, { TipDirection } from "../../components/base/TipDisplay";
import ShadowBox from "../../components/base/ShadowBox";
import TextAndLabel from "../../components/base/TextAndLabel";

function DungeonItems() {
    const [dungeonData, setDungeonData] = useState<Dungeons | undefined>(undefined);
    const appContext = useContext(AppContext);
    const idleonData = appContext.data.getData();

    useEffect(() => {
        setDungeonData(idleonData.get("dungeons") as Dungeons);
    }, [idleonData]);

    if (dungeonData) {
        return (
            <Box>
                <Grid columns={{
                    count: 12,
                    size: 'auto',
                }} gap="2px" fill>
                    {
                        dungeonData.items.filter(item => item.name != "").map((item, index) => (
                            <TipDisplay
                                key={index}
                                heading={`${item.name}`}
                                body={
                                    <Box>
                                        {item.level == -1 && <Text>Achivement to unlock: {item.achieve} in {item.world}</Text>}
                                        <Text>Bonus: {item.getBonusText()}</Text>
                                        {item.level != -1 && <Text>Next Level Cost: {item.getUpgradeCost()}</Text>}
                                    </Box>
                                }
                                size="Medium"
                                direction={TipDirection.Down}
                            >
                                <Box key={index} border={{ size: '2px', color: item.rarity }} align="center">
                                    <Box style={{ opacity: item.level != -1 ? 1 : 0.3 }} width={{ max: '42px', min: '42px' }}>
                                        <Box className={item.getClass()} />
                                    </Box>
                                    {item.level != -1 && <Text>{item.level}/{item.maxLevel}</Text>}
                                </Box>
                            </TipDisplay>
                        ))
                    }
                </Grid>
            </Box>
        )
    }

    // Still loading?
    return null;
}

function DungeonPassives() {
    const [dungeonData, setDungeonData] = useState<Dungeons | undefined>(undefined);
    const appContext = useContext(AppContext);
    const idleonData = appContext.data.getData();

    useEffect(() => {
        setDungeonData(idleonData.get("dungeons") as Dungeons);
    }, [idleonData]);

    if (dungeonData) {
        return (
            <Box pad={{ horizontal: "medium", bottom: "medium" }}>
                <Grid columns={{
                    count: 2,
                    size: 'auto',
                }} fill>
                    <Box pad="medium">
                        <Heading level="4">Dungeon</Heading>
                        {
                            dungeonData.passives.get(PassiveType.Dungeon)?.map((passive, index) => (
                                <ShadowBox background="dark-1" margin={{ bottom: 'small' }} key={index}>
                                    <Grid columns={["25%", "40%", "35%"]} key={`dungeon_${passive.index}`} pad="small" fill gap="small">
                                        <TextAndLabel
                                            label="Level"
                                            textSize="small"
                                            text={`${passive.level}/100`}
                                            margin={{ right: 'medium' }}
                                        />
                                        <TextAndLabel
                                            label="Bonus"
                                            textSize="small"
                                            text={`${passive.getBonus(true)}${passive.type} ${passive.effect}`}
                                        />
                                        <TextAndLabel
                                            label="Cost to max"
                                            textSize="small"
                                            text={`${passive.getCostToMax()}`}
                                        />
                                    </Grid>
                                </ShadowBox>
                            ))
                        }
                    </Box>
                    <Box pad="medium">
                        <Heading level="4">Flurbo</Heading>
                        {
                            dungeonData.passives.get(PassiveType.Flurbo)?.map((passive, index) => (
                                <ShadowBox background="dark-1" margin={{ bottom: 'small' }} key={index}>
                                    <Grid columns={["25%", "40%", "35%"]} key={`dungeon_${passive.index}`} pad="small" fill gap="small">
                                        <TextAndLabel
                                            label="Level"
                                            textSize="small"
                                            text={`${passive.level}/50`}
                                        />
                                        <TextAndLabel
                                            label="Bonus"
                                            textSize="small"
                                            text={`${passive.getBonus(true)}${passive.type} ${passive.effect}`}
                                        />
                                        <TextAndLabel
                                            label="Cost to max"
                                            textSize="small"
                                            text={`${passive.getCostToMax()}`}
                                        />
                                    </Grid>
                                </ShadowBox>

                            ))
                        }
                    </Box>
                </Grid >
            </Box >
        )
    }

    // Still loading?
    return null;
}

function DungeonTraits() {
    const [dungeonData, setDungeonData] = useState<Dungeons | undefined>(undefined);
    const appContext = useContext(AppContext);
    const idleonData = appContext.data.getData();

    useEffect(() => {
        setDungeonData(idleonData.get("dungeons") as Dungeons);
    }, [idleonData]);

    if (dungeonData) {
        return (
            <Box>
                <Grid columns={{
                    count: 3,
                    size: 'auto',
                }} gap="small" fill dir='column'>
                    {
                        Object.entries(DungeonSetInfo).sort(([set1Name, { visualOrder: visualorder1 }], [set2Name, { visualOrder }]) => visualorder1 > visualOrder ? 1 : -1).map(([setName, { rankReq }], index) => {
                            const setTraits = dungeonData.traits.filter(trait => trait.setName == setName);
                            return (
                                <ShadowBox background="dark-1" key={index} pad="small" align="center" style={{ opacity: dungeonData.rank < rankReq ? 0.4 : 1 }}>
                                    <Text>{setName} (Rank {rankReq}+)</Text>
                                    <Box pad="medium" direction="row" gap="small">
                                        {
                                            setTraits.map((trait, index) => (
                                                <Box key={`trait_${index}`}>
                                                    <TipDisplay
                                                        direction={TipDirection.Down}
                                                        size="medium"
                                                        body={trait.bonus}
                                                        heading={trait.setName}
                                                        >
                                                        <Box width={{ max: '51px', min: '25px' }}>
                                                            <Box className={trait.getClass()} />
                                                        </Box>
                                                    </TipDisplay>
                                                </Box>
                                            ))
                                        }
                                    </Box>
                                </ShadowBox>
                            )
                        })
                    }
                </Grid>
            </Box>
        )
    }

    // Still loading?
    return null;
}

function DungeonsDisplay() {
    const [dungeonData, setDungeonData] = useState<Dungeons | undefined>(undefined);
    const [subTab, setSubTab] = useState<string>("Items");
    const appContext = useContext(AppContext);
    const idleonData = appContext.data.getData();


    useEffect(() => {
        setDungeonData(idleonData.get("dungeons") as Dungeons);
    }, [idleonData]);

    return (
        <Box>
            <NextSeo title="Dungeons" />
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Dungeons</Heading>
            <Box pad="small">
                {dungeonData &&
                    <Box direction="row">
                        <TextAndLabel
                            text={`${dungeonData.rank} (${dungeonData.xp}/${dungeonLevels[dungeonData.rank]})`}
                            label="Rank"
                            margin={{right: 'medium'}}
                        />
                        <TextAndLabel
                            text={dungeonData.boostedcount.toString()}
                            label="Boosted Runs"
                            margin={{right: 'medium'}}
                        />
                        <TextAndLabel
                            text={dungeonData.credits.toString()}
                            label="Credits"
                            margin={{right: 'medium'}}
                        />
                        <TextAndLabel
                            text={dungeonData.flurbos.toString()}
                            label="Flurbos"
                        />
                    </Box>
                }
                <Box align="center" direction="row" justify="center" gap="small" margin={{ bottom: 'medium' }}>
                    <TabButton isActive={subTab == "Items"} text="Items" clickHandler={() => { setSubTab("Items"); }} />
                    <TabButton isActive={subTab == "Passives"} text="Passives" clickHandler={() => { setSubTab("Passives"); }} />
                    <TabButton isActive={subTab == "Traits"} text="Traits" clickHandler={() => { setSubTab("Traits"); }} />
                </Box>
                {subTab == "Items" && <DungeonItems />}
                {subTab == "Passives" && <DungeonPassives />}
                {subTab == "Traits" && <DungeonTraits />}
            </Box>
        </Box>
    )
}

export default DungeonsDisplay;