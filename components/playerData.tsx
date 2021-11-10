import {
    Box,
    Text,
    Tabs,
    Tab,
    Grid,
    Stack,
    Tip
} from 'grommet'
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../data/appContext'
import { GemStore } from '../data/domain/gemPurchases';
import { Guild } from '../data/domain/guild';

import { Player, SkillsIndex } from '../data/domain/player';
import { ClassIndex, ClassTalentMap, GetTalentArray } from '../data/domain/talents';
import { CapacityConst } from '../data/domain/capacity';
import { Alchemy, AlchemyConst, CauldronIndex } from "../data/domain/alchemy";
import { Stamp } from '../data/domain/stamps';
import { PlayerStatues } from '../data/domain/statues';

import { Coins, getCoinsArray, lavaFunc } from '../data/utility';
import CoinsDisplay from './coinsDisplay';

interface SkillProps {
    skillsMap: Map<SkillsIndex, number>
    skillsRank: Map<SkillsIndex, number>
}

function nth(n: number) { return `${n}${["st", "nd", "rd"][((n + 90) % 100 - 10) % 10 - 1] || "th"}` }

function ShowSkills(props: SkillProps) {
    const getSkillClass = (skill: SkillsIndex) => {
        switch (skill) {
            case SkillsIndex.Mining: return `icons-38 icons-ClassIcons42`;
            case SkillsIndex.Smithing: return `icons-38 icons-ClassIcons43`;
            case SkillsIndex.Chopping: return `icons-38 icons-ClassIcons44`;
            case SkillsIndex.Fishing: return `icons-38 icons-ClassIcons45`;
            case SkillsIndex.Alchemy: return `icons-38 icons-ClassIcons46`;
            case SkillsIndex.Catching: return `icons-38 icons-ClassIcons47`;
            case SkillsIndex.Trapping: return `icons-38 icons-ClassIcons48`;
            case SkillsIndex.Construction: return `icons-38 icons-ClassIcons49`;
            case SkillsIndex.Worship: return `icons-38 icons-ClassIcons50`;
            default: return '';
        }
    }

    return (
        <Grid
            rows={['1/3', '1/3', '1/3']}
            columns={['1/3', '1/3', '1/3']}
            areas={[
                ['mining', 'fishing', 'trapping'],
                ['smithing', 'alchemy', 'construction'],
                ['chopping', 'catching', 'worship'],
            ]}
        >
            {
                Array.from(props.skillsMap).map(([skillIndex, skillLevel]) => {
                    const skillRank = props.skillsRank.get(skillIndex);
                    return (
                        <Box key={`skill_${SkillsIndex[skillIndex].toLowerCase() ?? 'Unknown'}`} gridArea={`${SkillsIndex[skillIndex].toLowerCase() ?? 'Unknown'}`}>
                            <Stack anchor="bottom-left" alignSelf="center" >
                                <Box className={getSkillClass(skillIndex)} />
                                <Box pad={{ horizontal: 'large' }}>
                                    <Text size="medium">{skillLevel}</Text>
                                </Box>
                                <Box pad={{ horizontal: 'xlarge' }}>
                                    {skillRank != undefined && <Text>{nth(skillRank + 1)}</Text>}
                                </Box>
                            </Stack>

                        </Box>)
                })
            }
        </Grid >
    );
}

interface PlayerTabProps {
    player: Player
}

function PlayerTab({ player }: PlayerTabProps) {
    const [playerStatues, setPlayerStatues] = useState<PlayerStatues | undefined>(undefined);
    const [index, setIndex] = useState<number>(0);
    const [playerCoins, setPlayerCoins] = useState<Map<Coins, number>>(new Map());
    const [gemStore, setGemStore] = useState<GemStore | undefined>(undefined);
    const [stampData, setStampData] = useState<Stamp[][] | undefined>(undefined);
    const [guild, setGuild] = useState<Guild | undefined>(undefined);


    // capacity related numbers
    const [allCapBonus, setAllCapBonus] = useState<number>(0);
    const [extraBagsTalentBonus, setExtraBagsTalentBonus] = useState<number>(0);
    const [telekineticStorageBonus, setTelekineticStorageBonus] = useState<number>(0);
    const [guildCarryBonus, setGuildCarryBonus] = useState<number>(0);
    const [anvilCostDiscount, setAnvilCostDiscount] = useState<number>(0);
    const [zergPrayerBonus, setZergPrayerBonus] = useState<number>(0); // TODO: GET REAL NUMBER
    const [ruckSackPrayerBonus, setRuckSackPrayerBonus] = useState<number>(0); // TODO: GET REAL NUMBER
    const [carryCapShrineBonus, setCarryCapShrineBonus] = useState<number>(0); // TODO: GET REAL NUMBER
    const [starSignExtraCap, setStarSignExtraCap] = useState<number>(0); // TODO: GET REAL NUMBER


    const idleonData = useContext(AppContext);

    const onActive = (nextIndex: number) => setIndex(nextIndex);

    useEffect(() => {
        if (idleonData) {
            const theData = idleonData.getData();
            setPlayerStatues(theData.get("statues")[player.playerID]);
            setGemStore(theData.get("gems"));
            setStampData(theData.get("stamps"));
            setGuild(theData.get("guild"));
            const alchemy = theData.get("alchemy") as Alchemy;
            const anvilnomicsBubble = alchemy.cauldrons[CauldronIndex.Quicc].bubbles[AlchemyConst.Anvilnomics];
            const anvilnomicsBonus = lavaFunc(anvilnomicsBubble.func, anvilnomicsBubble.level, anvilnomicsBubble.x1, anvilnomicsBubble.x2, false);
            if (player.getBaseClass() == ClassIndex.Archer) {
                const greenCauldronBonusBubble = alchemy.cauldrons[CauldronIndex.Quicc].bubbles[AlchemyConst.CauldronBonusBubbleIndex];
                const classBonus = lavaFunc(greenCauldronBonusBubble.func, greenCauldronBonusBubble.level, greenCauldronBonusBubble.x1, greenCauldronBonusBubble.x2, false);
                setAnvilCostDiscount(anvilnomicsBonus * classBonus);
            }
            else {
                setAnvilCostDiscount(anvilnomicsBonus);
            }
            if (guild) {
                setGuildCarryBonus(lavaFunc(guild.guildBonuses[2].func, guild.guildBonuses[2].level, guild.guildBonuses[2].x1, guild.guildBonuses[2].x2));
            }
            if (player.talents) {
                const telekineticStorageTalent = player.talents.find(x => x.skillIndex == CapacityConst.TelekineticStorageSkillIndex);
                if (telekineticStorageTalent) {
                    setTelekineticStorageBonus(lavaFunc(telekineticStorageTalent.funcX, telekineticStorageTalent.level, telekineticStorageTalent.x1, telekineticStorageTalent.x2));
                }
                const extraBagsTalent = player.talents.find(x => x.skillIndex == CapacityConst.ExtraBagsSkillIndex);
                if (extraBagsTalent) {
                    setExtraBagsTalentBonus(lavaFunc(extraBagsTalent.funcX, extraBagsTalent.level, extraBagsTalent.x1, extraBagsTalent.x2));
                }
            }
            setAllCapBonus(player.capacity.getAllCapsBonus(guildCarryBonus, telekineticStorageBonus, carryCapShrineBonus, zergPrayerBonus, ruckSackPrayerBonus));
            setPlayerCoins(getCoinsArray(player.money));
        }
    }, [idleonData, player, allCapBonus, extraBagsTalentBonus, telekineticStorageBonus, guildCarryBonus, anvilCostDiscount, carryCapShrineBonus, guild, ruckSackPrayerBonus, zergPrayerBonus]);

    return (
        <Tabs activeIndex={index} onActive={onActive}>
            <Tab key={`player_${player.playerID}_random`} title="Random Stats">
                <Box pad="medium" gap="small">
                    <Text>Class / Level = {player.class} / {player.level}</Text>
                    <Text>Current Monster / Map = {player.currentMonster} / {player.currentMap}</Text>
                    {
                        player.starSigns.map((sign, index) => {
                            return <Text key={`sign-${index}`}>Sign {index} = {sign}</Text>
                        })
                    }
                    <Text>STR = {player.stats.strength}</Text>
                    <Text>AGI = {player.stats.agility}</Text>
                    <Text>WIS = {player.stats.wisdom}</Text>
                    <Text>LUK = {player.stats.luck}</Text>
                    <Text>Money = </Text><CoinsDisplay coinMap={playerCoins} />

                </Box>
            </Tab>
            <Tab key={`player_${player.playerID}_skills`} title="Skills">
                <Box pad="medium">
                    <ShowSkills skillsMap={player.skills} skillsRank={player.skillsRank} />
                </Box>
            </Tab>
            <Tab key={`player_${player.playerID}_equipment`} title="Equipment">
                <Box direction="row-responsive" pad="medium">
                    <Box key={`player_${index}_equip`}>
                        {
                            [...Array(8)].map((_, equipIndex) => {
                                if (player.gear.equipment[equipIndex].display_name == "Blank") {
                                    return (<Box width="50px" height="50px" />);
                                }
                                return (<Box key={`player_${index}_equip_${equipIndex}`} title={player.gear.equipment[equipIndex].display_name || ""} className={`icons icons-${player.gear.equipment[equipIndex].raw_name}_x1`} />)
                            })
                        }
                    </Box>
                    <Box key={`player_${index}_tools`}>
                        {
                            [...Array(8)].map((_, toolsIndex) => {
                                if (player.gear.tools[toolsIndex].display_name == "Blank") {
                                    return (<Box key={`player_${index}_equip_${toolsIndex}`} width="50px" height="50px" />);
                                }
                                return (<Box key={`player_${index}_equip_${toolsIndex}`} title={player.gear.tools[toolsIndex].display_name || ""} className={`icons icons-${player.gear.tools[toolsIndex].raw_name}_x1`} />)
                            })
                        }
                    </Box>
                    <Box key={`player_${index}_food`}>
                        {
                            [...Array(8)].map((_, foodIndex) => {
                                if (player.gear.food[foodIndex].display_name == "Blank") {
                                    return (<Box key={`player_${index}_equip_${foodIndex}`} width="50px" height="50px" />);
                                }
                                return (<Box key={`player_${index}_equip_${foodIndex}`} title={player.gear.food[foodIndex].display_name || ""} className={`icons icons-${player.gear.food[foodIndex].raw_name}_x1`} />)
                            })
                        }
                    </Box>
                </Box>
            </Tab>
            <Tab key={`player_${player.playerID}_statues`} title="Statues">
                <Box pad="medium" gap="xsmall">
                    {
                        playerStatues ? playerStatues.statues.map((statue, index) => {
                            return (
                                <Box key={`statue_${index}`} direction="row" gap="medium">
                                    <Box className={statue.getClassName()} title={statue.displayName} />
                                    <Text alignSelf="center">Level: {statue.level}</Text>
                                    <Text alignSelf="center">/</Text>
                                    <Text alignSelf="center">Bonus: {statue.getBonusText().toLocaleString()} {statue.bonus}</Text>
                                </Box>
                            )
                        }) : <></>
                    }
                </Box>
            </Tab>
            <Tab key={`player_${player.playerID}_anvil`} title="Anvil - WIP">
                <Box pad="small" gap="small">
                    <Box direction="column">
                        <Text>Available Points: {player.anvil.availablePoints}</Text>
                        <Text>Points from coins: {player.anvil.pointsFromCoins}</Text>
                        <Box direction="row">
                            <Text>Next Point Cost: </Text>
                            <CoinsDisplay coinMap={getCoinsArray(player.anvil.getCoinCost(anvilCostDiscount))} />
                        </Box>
                        <Box direction="row">
                            <Text>Total Point Cost: </Text>
                            <CoinsDisplay coinMap={getCoinsArray(player.anvil.getTotalCoinCost(anvilCostDiscount))} />
                        </Box>
                        <Text>Points from mats: {player.anvil.pointsFromMats}</Text>
                        <Text>Points spend into XP: {player.anvil.xpPoints}</Text>
                        <Text>Points spend into Speed: {player.anvil.speedPoints}</Text>
                        <Text>Capacity: {player.anvil.getCapacity(player.capacity.getMaterialCapacity(allCapBonus, stampData ? stampData[1][7].getBonus(player.skills.get(SkillsIndex.Smithing)) : 0, gemStore?.purchases.find(x => x.no == 58)?.pucrhased ?? 0, stampData ? stampData[2][1].getBonus() : 0, extraBagsTalentBonus, starSignExtraCap))} ({player.anvil.capPoints})</Text>
                        {player.anvil.currentlySelect.indexOf(-1) > -1 && <Text>UNUSED PRODUCTION</Text>}
                    </Box>
                    <Box gap="small">
                        {
                            player.anvil.production.filter((x, index) => x.displayName != "Filler" && player.anvil.currentlySelect.indexOf(index) > -1).map((anvilItem, index) => {
                                return (
                                    <Box key={`player_${player.playerID}_anvil_${index}`} direction="row" align="center">
                                        <Box className={`icons icons-${anvilItem.internalName}_x1`} />
                                        <Text>{anvilItem.displayName} - {anvilItem.currentAmount} - {anvilItem.currentXP} - {anvilItem.currentProgress} - {anvilItem.totalProduced}</Text>
                                    </Box>
                                )
                            })
                        }
                    </Box>
                </Box>
            </Tab>
            <Tab key={`player_${player.playerID}_carry`} title="Carry Capacity - WIP">
                <Box pad="small" gap="small">
                    <Box>
                        <Text>Guild Bonus: {guild && lavaFunc(guild.guildBonuses[2].func, guild.guildBonuses[2].level, guild.guildBonuses[2].x1, guild.guildBonuses[2].x2)} </Text>
                        <Text>Gem Capacity Bought: {gemStore?.purchases.find(x => x.no == 58)?.pucrhased} - {gemStore?.purchases.find(x => x.no == 58)?.desc}</Text>
                        <Text>Monster Mats Stamp: {stampData && stampData[1][7].getBonusText()}</Text>
                        <Text>All Cap Stamp: {stampData && stampData[2][1].getBonusText()} - {stampData && stampData[2][1].level}</Text>
                        <Text>All Carry Cap Math: {allCapBonus}</Text>
                        <Text>Material Cap Math: {player.capacity.getMaterialCapacity(allCapBonus, stampData ? stampData[1][7].getBonus(player.skills.get(SkillsIndex.Smithing)) : 0, gemStore?.purchases.find(x => x.no == 58)?.pucrhased ?? 0, stampData ? stampData[2][1].getBonus() : 0, extraBagsTalentBonus, starSignExtraCap)}</Text>
                        <Text>Anvil Cap Guess: {player.anvil.getCapacity(player.capacity.getMaterialCapacity(allCapBonus, stampData ? stampData[1][7].getBonus(player.skills.get(SkillsIndex.Smithing)) : 0, gemStore?.purchases.find(x => x.no == 58)?.pucrhased ?? 0, stampData ? stampData[2][1].getBonus() : 0, extraBagsTalentBonus, starSignExtraCap))} </Text>
                    </Box>
                    <Box gap="small">
                        <Text>Ore: {player.capacity.mining}</Text>
                        <Text>Fish: {player.capacity.fishing}</Text>
                        <Text>Materials: {player.capacity.monsterMats}</Text>
                        <Text>Bugs: {player.capacity.bugs}</Text>
                        <Text>Logs: {player.capacity.chopping}</Text>
                        <Text>Souls: {player.capacity.souls}</Text>
                        <Text>Critters: {player.capacity.critters}</Text>
                        <Text>Food: {player.capacity.food}</Text>
                    </Box>
                </Box>
            </Tab>
            <Tab key={`player_${player.playerID}_talents`} title="Talents - WIP">
                <Box pad="small" gap="medium">
                    {
                        ClassTalentMap[ClassIndex[player.class.replace(/ /g, "_") as keyof typeof ClassIndex]].concat(["Special Talent 1", "Special Talent 2"]).map((talentPage, _) => {
                            return (
                                <Box key={`player_${player.playerID}_talents_${talentPage}`} align="center" gap="medium">
                                    <Text>{talentPage}</Text>
                                    <Grid columns={{
                                        count: 5,
                                        size: 'auto',
                                    }} fill>
                                        {
                                            GetTalentArray(talentPage).map((originalTalent, index) => {
                                                const talent = player.talents.find(x => x.skillIndex == originalTalent.skillIndex);
                                                if (talent) {
                                                    const talentXBonus = lavaFunc(talent.funcX, talent.level, talent.x1, talent.x2, true);
                                                    const talentYBonus = lavaFunc(talent.funcY, talent.level, talent.y1, talent.y2, true)
                                                    return (
                                                        <Box pad="xxsmall" key={`player_${player.playerID}_talents_${index}`} direction="row">
                                                            <Tip
                                                                plain
                                                                content={
                                                                    <Box pad="small" gap="small" background="white" style={{ display: talent.level > 0 ? 'normal' : 'none' }}>
                                                                        <Text weight="bold">{talent.name}</Text>
                                                                        <Text>--------------------------</Text>
                                                                        {
                                                                            talent.description.includes("}") ?
                                                                                <Text>{talent.description.replace("{", talentXBonus.toString()).replace("}", talentYBonus.toString())}</Text>
                                                                                : <Text>{talent.description.replace("{", talentXBonus.toString())}</Text>
                                                                        }
                                                                    </Box>
                                                                }
                                                                dropProps={{ align: { top: 'bottom' } }}
                                                            >
                                                                <Box style={{ opacity: talent.maxLevel > 0 ? 1 : 0.2 }} className={`icon-56 icons-UISkillIcon${talent.skillIndex}`} title={talent.name} />
                                                            </Tip>
                                                            <Text>{talent.level} / {talent.maxLevel}</Text>
                                                        </Box>
                                                    )
                                                }
                                                return <></>
                                            })
                                        }
                                    </Grid>
                                </Box>
                            )
                        })
                    }
                </Box>
            </Tab>
            <Tab key={`player_${player.playerID}_postoffice`} title="Post Office - WIP">
                <Box pad="small" gap="small">
                    <Grid columns="1/4">
                        {
                            player.postOffice.map((box, index) => {
                                return (
                                    <Box key={`player_${player.playerID}_postoffice_${index}`} fill>
                                        <Stack anchor="bottom-right" alignSelf="center" key={`player_${player.playerID}_postoffice_${index}`}>
                                            <Tip
                                                plain
                                                content={
                                                    <Box pad="small" gap="small" background="white" style={{ display: box.level > 0 ? 'normal' : 'none' }}>
                                                        <Text weight="bold">{box.name}</Text>
                                                        <Text>--------------------------</Text>
                                                        {
                                                            box.bonuses.map((bonus, bIndex) => {
                                                                let level = box.level;
                                                                let maxLevel = 400
                                                                if (bIndex == 1) {
                                                                    level = box.level - 25;
                                                                    maxLevel = 375;
                                                                }
                                                                if (bIndex == 2) {
                                                                    level = box.level - 100;
                                                                    maxLevel = 300;
                                                                }
                                                                if (level < 0) return <></>
                                                                const bonusValue = lavaFunc(bonus.func, level, bonus.x1, bonus.x2, true);
                                                                const maxValue = lavaFunc(bonus.func, maxLevel, bonus.x1, bonus.x2, true);
                                                                return (
                                                                    <Box key={`player_${player.playerID}_postoffice_${index}_${bIndex}`} direction="row" gap="small">
                                                                        <Text>{`${bonusValue} ${bonus.bonus}`}</Text>
                                                                        <Text>{level < 400 && `(Max value is ${maxValue} at 400 boxes)`}</Text>
                                                                    </Box>
                                                                )
                                                            })
                                                        }
                                                    </Box>
                                                }
                                                dropProps={{ align: { top: 'bottom' } }}
                                            >
                                                {/* Do the opacity thing in styled components? */}
                                                <Box>
                                                    <Box style={{ opacity: box.level > 0 ? 1 : 0.3 }} className={`icons-88 icons-UIboxUpg${index}`} />
                                                </Box>
                                            </Tip>
                                            <Box background="black">
                                                <Text>{box.level}</Text>
                                            </Box>
                                        </Stack>
                                    </Box>
                                )
                            })
                        }
                    </Grid>
                </Box>
            </Tab>
        </Tabs>
    )
}

export default function PlayerData() {
    const [playerData, setPlayerData] = useState<Array<Player>>();
    const [index, setIndex] = useState<number>(0);

    const idleonData = useContext(AppContext);

    const onActive = (nextIndex: number) => setIndex(nextIndex);

    useEffect(() => {
        if (idleonData) {
            const theData = idleonData.getData();
            setPlayerData(theData.get("players"));
        }
    }, [idleonData]);
    return (
        <Box align="center" pad="large">
            <Tabs activeIndex={index} onActive={onActive}>
                {
                    playerData?.map((player, index) => {
                        return (
                            <Tab key={`player_${player.playerID}`} title={`${player.playerName ? player.playerName : `Character ${player.playerID}`}`}>
                                <Box pad="small">
                                    <PlayerTab player={player} />
                                </Box>
                            </Tab>
                        )
                    })
                }
            </Tabs>
        </Box>
    )
}