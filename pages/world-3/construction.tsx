import {
    Box,
    Heading,
    Text,
    Grid,
    ResponsiveContext,
    CheckBox
} from 'grommet'
import { useEffect, useContext, useState, useMemo } from 'react';
import { AppContext } from '../../data/appContext'
import { NextSeo } from 'next-seo';

import ShadowBox from '../../components/base/ShadowBox';
import TabButton from '../../components/base/TabButton';
import { Refinery } from '../../data/domain/refinery';
import { Item } from '../../data/domain/items';
import { Storage } from '../../data/domain/storage';
import { nFormatter, toTime } from '../../data/utility';
import { SaltLick } from '../../data/domain/saltLick';
import { Alchemy } from '../../data/domain/alchemy';
import { StaticTime, TimeDisplaySize, TimeDown } from '../../components/base/TimeDisplay';
import { Printer } from '../../data/domain/printer';
import { Player } from '../../data/domain/player';
import { CircleInformation, StatusWarning } from 'grommet-icons';
import TipDisplay, { TipDirection } from '../../components/base/TipDisplay';
import { Deathnote } from '../../data/domain/deathnote';
import { EnemyInfo } from '../../data/domain/enemies';
import TextAndLabel from '../../components/base/TextAndLabel';
import { ClassIndex, Talent } from '../../data/domain/talents';
import { TaskBoard } from '../../data/domain/tasks';


function RefineryDisplay() {
    const [playerData, setPlayerData] = useState<Player[]>();
    const [refineryData, setRefineryData] = useState<Refinery>();
    const [storage, setStorage] = useState<Storage>();
    const [itemData, setItemData] = useState<Item[]>();
    const [saltLickData, setSaltLickData] = useState<SaltLick>();
    const [alchemyData, setAlchemyData] = useState<Alchemy>();
    const [taskboardData, setTaskboardData] = useState<TaskBoard>();
    const [lastUpdated, setLastUpdated] = useState<Date | undefined>();
    const [squirePowha, setSquirePowha] = useState<boolean>(false);
    const idleonData = useContext(AppContext);
    const size = useContext(ResponsiveContext);

    const cycleInfo = useMemo(() => {
        if (!refineryData) {
            return [];
        }
        const vialBonus = alchemyData?.vials.find((vial) => vial.description.includes("Refinery Cycle Speed"))?.getBonus() ?? 0;
        const saltLickBonus = saltLickData?.getBonus(2) ?? 0;
        const toReturn = [
            { name: "Combustion", time: Math.ceil((900 * Math.pow(4, 0)) / (1 + ((vialBonus + saltLickBonus)) / 100)), timePast: refineryData.timePastCombustion }
        ];

        if (Object.keys(refineryData.salts).length > 3) {
            toReturn.push(
                { name: "Synthesis ", time: Math.ceil((900 * Math.pow(4, 1)) / (1 + ((vialBonus + saltLickBonus)) / 100)), timePast: refineryData.timePastSynthesis }
            );
        }

        return toReturn;
    }, [refineryData, saltLickData, alchemyData]);

    const squireInfo = useMemo(() => {
        const squires = playerData?.filter(player => player.classId == ClassIndex.Squire);
        return squires;
    }, [playerData])

    const squireTimeSave = useMemo(() => {
        const toReturn: number[] = [];
        if (refineryData?.salts) {
            Object.entries(refineryData.salts).forEach(([salt, info], index) => {
                // Perfect squire use math
                // (time to rank)-((time to rank -squire cd )/(72k-mana p.o))x (squire cycles x cycle speed) 
                if (squireInfo) {
                    const timeToNextRank = info.getTimeToNextRank(cycleInfo[Math.floor(index / 3)].time);
                    // Figure out the squire with the longest CD, simplify the math.
                    const maxSquireCD = Math.max(...squireInfo.map(squire => [...squire.cooldown.entries()].filter(([talent, cooldown]) => talent.skillIndex == 130).pop()?.[1] ?? 0));
                    // The squire skill can only be used after the cd, so ignore that portion.
                    const timeSquireCanImpact = timeToNextRank - maxSquireCD;


                    let timeSaved = 0;
                    // Do the math for each squire.
                    squireInfo.forEach(squire => {
                        // Find the mana box and get the CD reduction impact.
                        const manaBox = squire.postOffice.find(box => box.name == "Magician Starterpack");
                        const cdReduction = manaBox?.bonuses[2].getBonus(manaBox.level, 2) ?? 0;
                        const talentCD = (1 - cdReduction / 100) * 72000 // TODO: Get rid of magic numbers and names

                        // calculate how much time we can save using squire skill on CD.
                        const timePerSquireSkilluse = (squire.talents.find(talent => talent.skillIndex == 130)?.getBonus(false, false, true) ?? 0) * cycleInfo[Math.floor(index / 3)].time

                        // Calculate how much time we save every time we use the squire skill.
                        timeSaved += timeSquireCanImpact / talentCD * timePerSquireSkilluse;

                    })

                    // This can happen when the CD is longer than the actual time to rank up, so ignore it.
                    if (timeSaved < 0) {
                        toReturn.push(0);
                    }
                    else {
                        toReturn.push(timeSaved);
                    }
                }
            })
        }
        return toReturn;
    }, [squireInfo, refineryData, cycleInfo])

    const saltMeritLevel = useMemo(() => {
        const saltMerit = taskboardData?.merits.find(merit => merit.descLine1 == "Refinery Salt Costs don't scale beyond");
        return (saltMerit?.level ?? 0) + 1;

    }, [taskboardData]);

    useEffect(() => {
        if (idleonData) {
            const theData = idleonData.getData();
            setLastUpdated(idleonData.getLastUpdated(true) as Date);
            setRefineryData(theData.get("refinery"));
            setItemData(theData.get("itemsData"));
            setStorage(theData.get("storage"));
            setSaltLickData(theData.get("saltLick"));
            setAlchemyData(theData.get("alchemy"));
            setPlayerData(theData.get("players"));
            setTaskboardData(theData.get("taskboard"));
        }
    }, [idleonData, refineryData]);

    if (!refineryData || Object.entries(refineryData.salts).filter(([name, saltInfo]) => saltInfo.progress > 0).length == 0) {
        return (
            <Box align="center" pad="medium">
                <Heading level='3'>Come back when you unlocked this!</Heading>
            </Box>
        )
    }

    return (
        <Box gap="medium">
            <Box direction="row" wrap justify="center">
                {
                    cycleInfo.map((cycle, index) => {
                        return (
                            <ShadowBox margin={{ right: 'large', bottom: 'small' }} background="dark-1" key={index} gap="xsmall" pad="medium" align="center">
                                <TextAndLabel center textSize='xsmall' labelSize='medium' text='Next cycle in' label={cycle.name} />
                                <Box>
                                    <TimeDown addSeconds={cycle.time - cycle.timePast} lastUpdated={lastUpdated} resetToSeconds={cycle.time} />
                                </Box>
                                <Text margin={{ top: 'small' }} color="accent-3" size="12px">* Might be off by a few seconds.</Text>
                            </ShadowBox>
                        )
                    })
                }
                {squireInfo && squireInfo.map((squire, index) => {
                    const [refineryTalent, cooldown] = [...squire.cooldown.entries()].filter(([talent, cooldown]) => talent.skillIndex == 130)?.pop() as [Talent, number];
                    const realCD = cooldown - squire.afkFor;
                    console.log(cooldown, lastUpdated);
                    return (
                        <ShadowBox key={index} background="dark-1" pad="medium" align="center" margin={{ right: 'large', bottom: 'small' }}>
                            <Box gap="small">
                                <Box direction="row">
                                    <Box width={{ min: "30px", max: '30px' }} margin={{ right: 'small' }}>
                                        <Box className={`icons-3836 icons-ClassIcons${squire.classId.valueOf()}`} />
                                    </Box>
                                    <Text>{squire.playerName}</Text>
                                </Box>
                                <Box direction="row" gap="small">
                                    <Box style={{ opacity: cooldown == 0 ? 1 : 0.5 }} width={{ max: '36px', min: '36px' }}>
                                        <Box className={refineryTalent.getClass()} />
                                    </Box>
                                    {realCD > 0 && <TimeDown size={TimeDisplaySize.Small} lastUpdated={lastUpdated} addSeconds={realCD} resetToSeconds={72000} />}
                                    {realCD == 0 && <Text>Skill is ready!</Text>}
                                </Box>
                            </Box>
                        </ShadowBox>
                    )
                })
                }
            </Box>
            <CheckBox
                checked={squirePowha}
                label={<Box direction="row" align="center">
                    <Text margin={{ right: 'xsmall' }} size="small">Squire Power</Text>
                    <TipDisplay
                        body={<Box gap="xsmall">
                            <Text>This will make the following assumptions and calculate their impact on the time to rank-up:</Text>
                            <Text>* Assume perfect use of squire skill on CD (if you got more than one squire, they are assumed to be in perfect sync.)</Text>
                            <Text>* This is assuming the highest possible level for the squire skill based on your max talent level.</Text>
                        </Box>}
                        size="small"
                        heading='Squire Power!'
                        maxWidth='medium'
                        direction={TipDirection.Down}
                    >
                        <CircleInformation size="small" />
                    </TipDisplay>
                </Box>}
                onChange={(event) => setSquirePowha(event.target.checked)}
            />
            <Text>This is WIP - fuel times don&apos;t account for printer or auto refine salt generation.</Text>
            {
                refineryData?.salts && Object.entries(refineryData.salts).map(([salt, info], index) => {
                    const saltItem = itemData?.find((item) => item.internalName == salt);
                    const costItems = info.baseCost.map((cost) => cost.item);
                    const storageItems = itemData?.filter((item) => costItems.includes(item.internalName)) ?? [];
                    storageItems.forEach((storageItem) => {
                        const inSaltStorage = refineryData.storage.find((saltStorageItem) => saltStorageItem.name == storageItem.internalName);
                        const inChestStorage = storage?.chest.find((item) => item.internalName == storageItem.internalName)
                        storageItem.count = (inSaltStorage?.quantity ?? 0) + (inChestStorage?.count ?? 0);
                    });
                    const fuelTime = info.getFuelTime(storageItems, [], index <= saltMeritLevel) * cycleInfo[Math.floor(index / 3)].time;
                    const timeToNextRank = info.getTimeToNextRank(cycleInfo[Math.floor(index / 3)].time);


                    if (saltItem) {
                        return (
                            <ShadowBox key={index} background="dark-1">
                                <Grid columns={size == "small" ? ["50%", "50%"] : ["15%", "20%", "30%", "35%"]}>
                                    <Box key={index} direction="row" gap="medium" align="center" background="dark-2" pad="medium" justify="center" fill>
                                        <Box align="center">
                                            <Box title={saltItem.displayName} width={{ max: '75px', min: '75px' }}>
                                                <Box className={saltItem.getClass()} />
                                            </Box>
                                            <Box align="center">
                                                <Text size="large">{info.rank}</Text>
                                                <Text color="accent-2" size="small">Rank</Text>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box pad="medium" align="center">
                                        <Box pad={{ vertical: "medium" }} gap="small" border={{ color: 'grey-1', side: 'right', size: '3px' }} fill>
                                            {
                                                timeToNextRank > 0 ?
                                                    <Box>
                                                        <Text color="accent-2" size="small">Rank up in</Text>
                                                        <Box>
                                                            {info.active && fuelTime > 0 ? <TimeDown size={size == "medium" ? TimeDisplaySize.Medium : TimeDisplaySize.Large} addSeconds={squirePowha ? timeToNextRank - squireTimeSave[index] : timeToNextRank} lastUpdated={lastUpdated} /> : <Text color="accent-1" size="small">Not active</Text>}
                                                        </Box>
                                                    </Box>
                                                    :
                                                    <Box >
                                                        <Text size="xlarge">Rank up ready</Text>
                                                    </Box>
                                            }
                                        </Box>
                                    </Box>
                                    <Box pad="medium">
                                        <Box gap="small" border={{ color: 'grey-1', side: 'right', size: '3px' }} fill>
                                            <Box>
                                                <Text color="accent-2" size="small">Power</Text>
                                                <Text size="medium">{info.progress} / {info.getCap()}</Text>
                                            </Box>
                                            <Box>
                                                <Text color="accent-2" size="small">Auto Refine at</Text>
                                                <Text size="medium">{info.autoRefine}%</Text>
                                            </Box>
                                            <Box>
                                                <Text color="accent-2" size="small">Fuel</Text>
                                                {fuelTime > 0 && (info.active ?
                                                    <TimeDown color={fuelTime > timeToNextRank ? 'green-1' : 'accent-1'} addSeconds={fuelTime} lastUpdated={lastUpdated} />
                                                    : <StaticTime color={fuelTime > timeToNextRank ? 'green-1' : 'accent-1'} fromSeconds={fuelTime} />
                                                )}
                                                {fuelTime == 0 && <Text color="accent-1" size="small">Empty</Text>}
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box pad="medium">
                                        <Box wrap align="start" gap="small">
                                            <Text size="small">Cost</Text>
                                            <Box gap="xsmall">
                                                {
                                                    info.baseCost && info.baseCost.map((costData, index) => {
                                                        const costItem = itemData?.find((item) => item.internalName == costData.item);
                                                        const itemCost = costData.quantity * info.getCostMulti(costData.item.includes("Refinery"), index <= saltMeritLevel);
                                                        const storageQuantity = storageItems.find(x => x.internalName == costData.item)?.count ?? 0;
                                                        if (costItem) {
                                                            return (
                                                                <Box key={index} direction="row" align="center">
                                                                    <Box title={costItem?.displayName} width={{ max: '30px', min: '30px' }}>
                                                                        <Box className={costItem?.getClass()} />
                                                                    </Box>
                                                                    <Box direction="row" gap="xsmall" align="center">
                                                                        <Text size="small">{itemCost}</Text>
                                                                        <Text color={storageQuantity < itemCost ? 'accent-1' : ''} size="small">({nFormatter(storageQuantity, 2)})</Text>
                                                                    </Box>
                                                                </Box>
                                                            )
                                                        }
                                                    })
                                                }
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>
                            </ShadowBox>
                        )
                    }
                }
                )
            }
        </Box>
    )
}

function SaltLickDisplay() {
    const [saltLickData, setSaltLickData] = useState<SaltLick>();
    const [itemData, setItemData] = useState<Item[]>();
    const idleonData = useContext(AppContext);

    useEffect(() => {
        if (idleonData) {
            const theData = idleonData.getData();
            setItemData(theData.get("itemsData"));
            setSaltLickData(theData.get("saltLick"));
        }
    }, [idleonData]);

    if (!saltLickData || saltLickData.bonuses.filter(bonus => bonus.level ?? 0 > 0).length == 0) {
        return (
            <Box align="center" pad="medium">
                <Heading level='3'>Come back when you unlocked this!</Heading>
            </Box>
        )
    }

    return (
        <Box gap="medium">
            {
                saltLickData && saltLickData.bonuses.map((bonus, index) => {
                    const saltItem = itemData?.find((item) => item.internalName == bonus.item);
                    if (saltItem) {
                        return (
                            <ShadowBox key={index} background="dark-1" pad="medium" gap="xlarge" direction="row" align="center" justify="between">
                                <Grid columns={["35%", "20%", "20%", "20%"]} fill gap="small" align="center">
                                    <TextAndLabel textSize='small' text={saltLickData.getBonusText(index)} label="Bonus" />
                                    <TextAndLabel text={`${bonus.level} / ${bonus.maxLevel}`} label="Level" />
                                    <Box direction="row" align="center">
                                        <TextAndLabel text={nFormatter(saltLickData.getCost(index), 2)} label="Next Level costs" />
                                        <Box title={saltItem.displayName} width={{ max: '50px', min: '50px' }}>
                                            <Box className={saltItem.getClass()} />
                                        </Box>
                                    </Box>
                                    <Box direction="row" align="center">
                                        <TextAndLabel text={nFormatter(saltLickData.getCostToMax(index), 2)} label="Cost to max" />
                                        <Box title={saltItem.displayName} width={{ max: '50px', min: '50px' }}>
                                            <Box className={saltItem.getClass()} />
                                        </Box>
                                    </Box>
                                </Grid>
                            </ShadowBox>
                        )
                    }
                }
                )
            }
        </Box>
    )

}

function PrinterDisplay() {
    const [playerData, setPlayerData] = useState<Player[]>();
    const [printerData, setPrinterData] = useState<Printer>();
    const [itemData, setItemData] = useState<Item[]>();
    const idleonData = useContext(AppContext);

    useEffect(() => {
        if (idleonData) {
            const theData = idleonData.getData();
            setItemData(theData.get("itemsData"));
            setPrinterData(theData.get("printer"));
            setPlayerData(theData.get("players"));
        }
    }, [idleonData]);

    if (!printerData || printerData.playerInfo.filter(player => player.samples.filter(sample => sample.item != "Blank").length > 0).length == 0) {
        return (
            <Box align="center" pad="medium">
                <Heading level='3'>Come back when you unlocked this!</Heading>
            </Box>
        )
    }
    console.log(printerData);
    return (
        <ShadowBox background="dark-1" gap="small">
            {
                printerData && printerData.playerInfo.map((playerInfo, index) => {
                    return (
                        <Box key={index} direction="row" align="center" gap="medium" pad={{ horizontal: "large", vertical: "small" }} border={{ color: 'grey-1', side: 'bottom' }}>
                            <Text>{playerData && playerData[index] && playerData[index].playerName}</Text>
                            {
                                playerInfo.samples.map((sample, sampleIndex) => {
                                    if (sample.item == "Blank") {
                                        return <></>
                                    }
                                    const sampleItem = itemData?.find((item) => item.internalName == sample.item);
                                    const activeItem = playerInfo.active.find((activeItem) => activeItem.item == sample.item);
                                    return (
                                        <Box key={sampleIndex} direction="row" align="center">
                                            <Box pad="small" gap="small" align="center">
                                                <Box width={{ max: '36px', min: '36px' }}>
                                                    <Box className={sampleItem?.getClass()} />
                                                </Box>
                                                <Box direction="row" align="center" gap="small">
                                                    {activeItem && (activeItem?.quantity ?? 0) < sample.quantity &&
                                                        <TipDisplay
                                                            heading='Active lower than sample'
                                                            body={<Box><Text>You have a sample of {nFormatter(sample.quantity, 2)} but only printing {nFormatter(activeItem.quantity, 2)}.</Text><Text>Go update your printing!</Text></Box>}
                                                            size='large'
                                                            direction={TipDirection.Down}
                                                        >
                                                            <StatusWarning size="15px" color="accent-1" />
                                                        </TipDisplay>
                                                    }
                                                    <Text color={activeItem ? 'green-1' : ''} size="small">{nFormatter(sample.quantity, 2)}</Text>
                                                </Box>
                                            </Box>
                                        </Box>
                                    )
                                })
                            }
                        </Box>
                    )
                }
                )
            }
        </ShadowBox>
    )

}

function DeathnoteDisplay() {
    const [playerData, setPlayerData] = useState<Player[]>();
    const [deathnoteData, setDeathnoteData] = useState<Deathnote>();
    const idleonData = useContext(AppContext);

    const monsterInfo = EnemyInfo;

    const deathNoteByWorld = useMemo(() => {
        const toReturn = new Map<string, Map<string, number>>();
        if (!deathnoteData) {
            return toReturn;
        }

        deathnoteData.mobKillCount.forEach((killArray, mobName) => {
            const monsterData = monsterInfo.find((monster) => monster.details.internalName == mobName);
            const killCount = killArray.reduce((sum, killCount) => sum += Math.round(killCount), 0);
            if (monsterData?.mapData?.world) {
                if (!toReturn.has(monsterData.mapData.world)) {
                    toReturn.set(monsterData.mapData.world, new Map<string, number>());
                }

                toReturn.get(monsterData.mapData.world)?.set(monsterData.details.Name, killCount);
            }
        });
        return toReturn;
    }, [deathnoteData, monsterInfo])

    const worldTierInfo = useMemo(() => {
        const toReturn: number[] = [];
        if (deathNoteByWorld.size == 0) {
            return toReturn;
        }

        [...deathNoteByWorld.entries()].forEach(([worldName, deathnoteMobs]) => {
            const worldRankSum = [...deathnoteMobs.values()].reduce((sum, killCount) => sum += deathnoteData?.getDeathnoteRank(killCount) ?? 0, 0);
            toReturn.push(worldRankSum);
        })
        return toReturn;
    }, [deathNoteByWorld, deathnoteData])

    useEffect(() => {
        if (idleonData) {
            const theData = idleonData.getData();
            setDeathnoteData(theData.get("deathnote"));
            setPlayerData(theData.get("players"));
        }
    }, [idleonData]);

    if (!deathnoteData) {
        return (
            <Box align="center" pad="medium">
                <Heading level='3'>Come back when you unlocked this!</Heading>
            </Box>
        )
    }

    return (
        <Grid columns="1/3">
            {
                deathNoteByWorld && [...deathNoteByWorld.entries()].map(([worldName, deathnoteMobs], index) => {
                    return (
                        <ShadowBox background="dark-1" key={index} gap="medium" pad="medium">
                            <Text>{worldName} (Bonus {worldTierInfo[index]}%)</Text>
                            {
                                [...deathnoteMobs.entries()].map(([mobName, killCount], mobIndex) => (
                                    <Box key={mobIndex} direction="row" gap="small" align="center" border={deathnoteMobs.size != mobIndex + 1 ? { side: 'bottom', color: 'grey-1', size: '2px' } : undefined} pad={{ bottom: "small" }}>
                                        <Box width={{ max: '20px', min: '20px' }}>
                                            <Box className={deathnoteData?.getRankClass(deathnoteData?.getDeathnoteRank(killCount))} />
                                        </Box>
                                        <Text size="small">{mobName}</Text>
                                        <Text size="small">{nFormatter(killCount, 2)}</Text>
                                    </Box>
                                ))
                            }
                        </ShadowBox>
                    )
                })
            }
        </Grid>
    )

}

function Construction() {
    const [activeTab, setActiveTab] = useState<string>("Refinery");
    const idleonData = useContext(AppContext);

    useEffect(() => {
        if (idleonData) {
            const theData = idleonData.getData();
        }
    }, [idleonData]);

    return (
        <Box>
            <NextSeo title="Construction" />
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Construction</Heading>
            <Box gap="small">
                <Box align="center" direction="row" justify="center" gap="small">
                    {["Refinery", "Salt Lick", "Printer", "Death note"].map((tabName, index) => (
                        <TabButton key={index} isActive={activeTab == tabName} text={tabName} clickHandler={() => { setActiveTab(tabName); }} />
                    ))
                    }
                </Box>
                {activeTab == "Refinery" && <RefineryDisplay />}
                {activeTab == "Salt Lick" && <SaltLickDisplay />}
                {activeTab == "Printer" && <PrinterDisplay />}
                {activeTab == "Death note" && <DeathnoteDisplay />}
            </Box>
        </Box>
    )
}

export default Construction;