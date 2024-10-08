"use client"

import {
    Box,
    Heading,
    Text,
} from 'grommet'
import { useState } from 'react';
import IconImage from '../../../components/base/IconImage';
import ShadowBox from '../../../components/base/ShadowBox';
import TabButton from '../../../components/base/TabButton';
import TextAndLabel, { ComponentAndLabel } from '../../../components/base/TextAndLabel';
import { ConstructionMastery, KillroyPrime, Rift, RiftBonus, SkillMastery } from '../../../data/domain/rift';
import { SkillsIndex } from '../../../data/domain/SkillsIndex';
import { Skilling } from '../../../data/domain/skilling';
import { ImageData } from '../../../data/domain/imageData';
import { Player } from '../../../data/domain/player';
import TipDisplay, { TipDirection } from '../../../components/base/TipDisplay';
import { Construction } from '../../../data/domain/construction';
import { nFormatter } from '../../../data/utility';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';

function BonusBlock({ label, text, icon, textSize = 'xlarge' }: { label: string, text: string, icon?: ImageData, textSize?: string }) {
    return (
        <ShadowBox background="dark-1" pad="small" margin={{ right: 'medium' }}>
            <ComponentAndLabel
                label={label}
                component={
                    <Box direction="row" gap="small" align="center">
                        {icon && <IconImage data={icon} scale={0.5} />}
                        <Text size={textSize}>{text}</Text>
                    </Box>
                }
            />
        </ShadowBox>
    )
}

function ConstructMasteryDisplay() {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const skillMilestones = [250, 500, 750, 1000, 1250, 1500, 2500];

    const rift = theData.get("rift") as Rift;
    const constMastery = rift.bonuses.find(bonus => bonus.name == "Construct Mastery") as ConstructionMastery;
    const construction = theData.get("construction") as Construction;

    const leastBuildRate = construction.buildings.slice()
        .filter(building => building.level != building.maxLvl) // ignore max level
        .sort((building1, building2) => building1.getBuildCost() > building2.getBuildCost() ? 1 : -1) // sort by build cost
    [0];

    const nextMilestone = skillMilestones.find(milestone => milestone > constMastery.buildingLevels);

    if (!rift) {
        return (
            <Box>
                Still loading
            </Box>
        )
    }

    return (<Box>
        <Box>
            <Box direction="row" wrap margin={{ bottom: 'medium' }}>
                {
                    nextMilestone && <BonusBlock label="Next Unlock" text={nextMilestone.toString()} />
                }
                <BonusBlock label="Total building level" text={constMastery.buildingLevels.toString()} />
                <BonusBlock label="Fastest to Level" text={leastBuildRate.name} icon={leastBuildRate.getImageData()} textSize='medium' />
                {constMastery.getRank() > 0 && <BonusBlock label="Refinery Speed" text={`${constMastery.getBonusByIndex(0)}%`} />}
                {constMastery.getRank() > 2 && <BonusBlock label="Damage" text={`${constMastery.getBonusByIndex(2)}%`} />}
                {constMastery.getRank() > 4 && <BonusBlock label="Build Speed" text={`${constMastery.getBonusByIndex(4)}%`} />}
            </Box>
            <ShadowBox width={{ min: '300px', max: '300px' }} background="dark-1" margin={{ bottom: 'medium', right: 'small' }} pad="small">
                <Box>
                    {
                        skillMilestones.map((milestone, index) => (
                            <Box key={`milestone_${index}`} style={{ opacity: constMastery.buildingLevels > milestone ? 1 : 0.5 }} margin={{ bottom: 'xsmall' }}>
                                <Text size="small">{constMastery.getBonusText(index)}</Text>
                            </Box>
                        ))
                    }
                </Box>
            </ShadowBox>
        </Box>
    </Box>)
}

function SkillMasteryDisplay() {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const skillMilestones = [150, 200, 300, 400, 500, 750, 1000];

    const rift = theData.get("rift") as Rift;
    const players = theData.get("players") as Player[];
    const skillMastery = rift.bonuses.find(bonus => bonus.name == "Skill Mastery") as SkillMastery;

    if (!rift) {
        return (
            <Box>
                Still loading
            </Box>
        )
    }

    return (<Box>
        <Text size="xsmall">* Hover over the total level to see player level breakdown.</Text>
        <Box direction="row" wrap>
            {
                Object.entries(skillMastery.skillLevels).map(([skillAsString, skillLevel], index) => {
                    const skillName = SkillsIndex[parseInt(skillAsString)];
                    const skillIndex = SkillsIndex[skillName as keyof typeof SkillsIndex];
                    const nextMilestone = skillMilestones.find(milestone => milestone > skillLevel);
                    return (
                        <ShadowBox width={{ min: '300px', max: '300px' }} style={{ opacity: skillLevel > 0 ? 1 : 0.5 }} key={index} background="dark-1" margin={{ bottom: 'medium', right: 'small' }} pad="small">
                            <TipDisplay
                                heading='Levels'
                                body={
                                    <Box>
                                        {
                                            players.map((player, index) => (
                                                <Box key={index} margin={{ bottom: 'xsmall' }}>
                                                    <Text size="small">{player.playerName}: Lv {player.skills.get(skillIndex)?.level ?? 0}</Text>
                                                </Box>
                                            ))
                                        }
                                    </Box>
                                }
                            >
                                <Box direction="row" justify="between">
                                    <Box direction="row" gap="small" align="center" margin={{ bottom: 'small' }}>
                                        <IconImage data={Skilling.getSkillImageData(skillIndex)} scale={0.7} />
                                        <Text size="small">Lv {skillLevel}</Text>

                                    </Box>
                                    {nextMilestone && <Text size="xsmall">Next bonus at: {nextMilestone}</Text>}
                                </Box>
                            </TipDisplay>
                            <Box>
                                {
                                    skillMilestones.map((milestone, index) => (
                                        <Box key={`milestone_${index}`} style={{ opacity: skillLevel >= milestone ? 1 : 0.5 }} margin={{ bottom: 'xsmall' }}>
                                            <Text size="small">{skillMastery.getBonusText(skillIndex, index)}</Text>
                                        </Box>
                                    ))
                                }
                            </Box>
                        </ShadowBox>

                    )
                })
            }
        </Box>
    </Box >)
}

const isKillroyPrime = (x: RiftBonus): x is KillroyPrime => "KRBest" in x;

const KillroyPrimeTooltip = ({ bonus }: { bonus: KillroyPrime }) => {
    return (
        <Box direction="row" gap="medium">
            <TextAndLabel label='Total Kills' text={nFormatter(bonus.totalKills)}/>
            <TextAndLabel label='Bonus' text={bonus.getBonusText()} />
        </Box>
    )
}

function RiftBonusDisplay() {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    
    const rift = theData.get("rift") as Rift;

    if (!rift) {
        return (
            <Box>
                Still loading
            </Box>
        )
    }

    return (<Box>
        <Box direction="row" wrap>
            {
                rift.bonuses.map((bonus, index) => (
                    <ShadowBox width={{ min: '300px', max: '300px' }} style={{ opacity: bonus.active ? 1 : 0.5 }} key={index} background="dark-1" margin={{ bottom: 'medium', right: 'small' }} pad="small">
                        <TipDisplay
                            heading={isKillroyPrime(bonus) ? 'Killroy Prime' : ''}
                            visibility={isKillroyPrime(bonus) ? '' : 'none'}
                            direction={TipDirection.Up}
                            body={isKillroyPrime(bonus) ? <KillroyPrimeTooltip bonus={bonus} /> : undefined}
                        >
                            <Box direction="row" gap="small" align="center" justify="between">
                                <Box direction="row" gap="small" align="center">
                                    <IconImage data={bonus.getImageData()} scale={0.7} />
                                    <Text>{bonus.name}</Text>
                                </Box>
                                {
                                    !bonus.active && <Text size="xsmall">{`Unlock at ${bonus.unlockAt}`}</Text>
                                }
                            </Box>
                            <Box margin={{ top: 'xsmall' }}>
                                <TextAndLabel textSize='xsmall' label="Bonus" text={bonus.getDescription()} />
                            </Box>
                        </TipDisplay>
                    </ShadowBox>
                ))
            }
        </Box>
    </Box >)
}


function RiftDisplay() {
    const [activeTab, setActiveTab] = useState<string>("Bonuses");
    return (
        <Box>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Rift</Heading>
            <Box align="center" direction="row" justify="center" gap="small" margin={{ bottom: 'small' }}>
                {["Bonuses", "Skill Mastery", "Construct Mastery"].map((tabName, index) => (
                    <TabButton key={index} isActive={activeTab == tabName} text={tabName} clickHandler={() => { setActiveTab(tabName); }} />
                ))
                }
            </Box>
            {activeTab == "Bonuses" && <RiftBonusDisplay />}
            {activeTab == "Skill Mastery" && <SkillMasteryDisplay />}
            {activeTab == "Construct Mastery" && <ConstructMasteryDisplay />}
        </Box>
    )
}

export default RiftDisplay;