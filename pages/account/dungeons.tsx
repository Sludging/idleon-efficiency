import {
    Box,
    Grid,
    Heading,
    Text,
} from "grommet"

import { useContext, useEffect, useMemo, useState } from 'react';
import { NextSeo } from 'next-seo';
import TabButton from "../../components/base/TabButton";
import { AppContext } from "../../data/appContext";
import { dungeonLevels, Dungeons, DungeonSetInfo, PassiveType } from "../../data/domain/dungeons";
import TipDisplay, { TipDirection } from "../../components/base/TipDisplay";
import ShadowBox from "../../components/base/ShadowBox";
import TextAndLabel from "../../components/base/TextAndLabel";
import { dateToText } from "../../data/utility";
import IconImage from "../../components/base/IconImage";

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
                                <Box key={index} border={{ size: '2px', color: item.rarity }} align="center" fill>
                                    <Box style={{ opacity: item.level != -1 ? 1 : 0.3 }}>
                                        <IconImage data={item.getImageData()} />
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
                                                        <IconImage data={trait.getImageData()} />
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
    const [serverVars, setServerVars] = useState<Record<string, any>>({})
    const appContext = useContext(AppContext);
    const idleonData = appContext.data.getData();

    const nextHappyHour = useMemo(() => {
        if (serverVars && Object.keys(serverVars).includes("HappyHours")) {
            const happyHours = serverVars["HappyHours"] as number[];
            let lastThursday = new Date();
            while (lastThursday.getDay() != 4) {
                lastThursday.setSeconds(lastThursday.getSeconds() - 86400);
            }
            lastThursday.setHours(0);
            lastThursday.setMinutes(0);
            lastThursday.setSeconds(0);

            // Convert from currnet timezone to UTC to do the offset.
            lastThursday = new Date(lastThursday.getTime() - lastThursday.getTimezoneOffset() * 60 * 1000);
            for (let index = 0; index < happyHours.length; index++) {
                const nextHour = happyHours[index];
                if (nextHour) {
                    const happyHourTime = new Date(lastThursday.getTime() + nextHour * 1000);
                    if (happyHourTime > new Date()) {
                        return new Date(happyHourTime.getTime() - 3600 * 1000);
                    }
                }
            }

            // Nothing this week, show for next week
            let nextThursday = new Date();
            while (nextThursday.getDay() != 4) {
                nextThursday.setSeconds(nextThursday.getSeconds() + 86400);
            }
            nextThursday.setHours(0);
            nextThursday.setMinutes(0);
            nextThursday.setSeconds(0);

            // Convert from currnet timezone to UTC to do the offset.
            nextThursday = new Date(nextThursday.getTime() - nextThursday.getTimezoneOffset() * 60 * 1000);
            for (let index = 0; index < happyHours.length; index++) {
                const nextHour = happyHours[index];
                if (nextHour) {
                    const happyHourTime = new Date(nextThursday.getTime() + nextHour * 1000);
                    if (happyHourTime > new Date()) {
                        return new Date(happyHourTime.getTime() - 3600 * 1000);
                    }
                }
            }
        }
        return undefined;
    }, [serverVars]);

    useEffect(() => {
        setDungeonData(idleonData.get("dungeons") as Dungeons);
        setServerVars(idleonData.get("servervars"));
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
                            margin={{ right: 'medium' }}
                        />
                        <TextAndLabel
                            text={dungeonData.boostedcount.toString()}
                            label="Boosted Runs"
                            margin={{ right: 'medium' }}
                        />
                        <TextAndLabel
                            text={dungeonData.credits.toString()}
                            label="Credits"
                            margin={{ right: 'medium' }}
                        />
                        <TextAndLabel
                            text={dungeonData.flurbos.toString()}
                            label="Flurbos"
                            margin={{ right: 'medium' }}
                        />
                        {nextHappyHour &&
                            <TextAndLabel
                                label="Next Happy Hour"
                                textSize="small"
                                text={`${dateToText(nextHappyHour)} (* Lava can change this at any time)`}
                            />
                        }
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