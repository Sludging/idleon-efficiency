import {
    Box,
    Grid,
    Heading,
    Text,
} from 'grommet'
import { NextSeo } from 'next-seo';
import { useContext, useMemo } from 'react';
import { AppContext } from '../../data/appContext';
import { SneakingActivity, Sneaking as SneakingDomain, SneakingPlayer } from '../../data/domain/world-6/sneaking';
import ShadowBox from '../../components/base/ShadowBox';
import IconImage from '../../components/base/IconImage';
import { CharacterBox } from '../../components/base/CharacterBox';
import { Player } from '../../data/domain/player';
import { SkillsIndex } from '../../data/domain/SkillsIndex';
import TextAndLabel, { ComponentAndLabel } from '../../components/base/TextAndLabel';
import { nFormatter } from '../../data/utility';
import { ImageData } from '../../data/domain/imageData';


function Sneaking() {
    const appContext = useContext(AppContext);
    const data = appContext.data.getData();

    const sneaking = data.get("sneaking") as SneakingDomain;
    const players = data.get("players") as Player[];

    const jadeUpgrades = useMemo(() => {
        if (!sneaking) {
            return []
        }

        return sneaking.jadeUpgrades.toSorted((upgrade1, upgrade2) => upgrade1.displayOrder > upgrade2.displayOrder ? 1 : -1);
    }, [appContext, sneaking])

    // Lava shows the next 3 upgrades only at a time, so we need to find the last purchased one and use that info to hide the rest.
    const indexOfBestUpgrade = useMemo(() => {
        for (const upgrade of jadeUpgrades) {
            // Look at purchases in order, find the first one that isn't purchased and return the previous index.
            if (!upgrade.purchased) {
                return upgrade.displayOrder - 1;
            }
        }

        return jadeUpgrades.length;
    }, [jadeUpgrades])

    const PlayerActivity = ({ player }: { player: SneakingPlayer }) => {
        const imageData: ImageData = {
            location: `sneaking_activity_${player.activity.toString().toLowerCase()}`,
            width: 40,
            height: 40
        }
        let text = <Text size="xsmall">{player.activity.toString()}</Text>;
        if (player.activity == SneakingActivity.Tied) {
            text = <Text size="xsmall">Floor {player.floor}</Text>
        }

        return (
            <Box direction="row" align="center" pad={{ bottom: 'xsmall' }}>
                <IconImage data={imageData} scale={0.6} />
                {/* The image has some blank space on top, so we pad the text a bit to make it more aligned. */}
                <Box pad={{ top: 'xsmall' }}>{text}</Box>
            </Box>
        )
    }

    if (!sneaking) {
        return <>Loading...</>
    }
    return (
        <Box>
            <NextSeo title="Sneaking" />
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Sneaking</Heading>
            <Text size="xsmall">* This is a work in progress, there could some bugs and minor inaccuracies. THE UI ISN&apos;T FINAL!</Text>
            <Box>
                <ShadowBox width={"xsmall"} margin={{ right: 'large', bottom: 'small' }} background="dark-1" gap="xsmall" pad="small" align="center">
                    <ComponentAndLabel
                        label='Jade'
                        component={
                            <Box gap="small" direction="row" align="center">
                                <IconImage data={sneaking.getJadeImageData()} scale={0.7} />
                                <Text size="small">{nFormatter(sneaking.jade)}</Text>
                            </Box>
                        }
                    />
                </ShadowBox>
            </Box>
            <Box margin={{ bottom: 'medium' }}>
                <Text size="large">Player Activity</Text>
                <Grid columns={{ size: 'small', count: 'fill' }} pad={{ top: "small", bottom: "small" }}>
                    {
                        sneaking.players.map((player, index) => {
                            const playerData = players[player.index]
                            return (
                                <Box key={index} margin={{ right: 'small', bottom: 'small' }}>
                                    <CharacterBox player={playerData} textColor={player.activity == SneakingActivity.Tied ? 'grey-2' : 'white-2'} borderColor={player.activity == SneakingActivity.Tied ? 'grey-1' : 'green-1'}>
                                        <Box direction="row" margin={{ top: 'xsmall' }}>
                                            <Box pad={{ right: 'small' }} margin={{ right: 'small' }} direction="row" border={{ side: 'right', color: 'grey-1' }} align="center">
                                                <Box width={{ max: '15px' }} margin={{ right: 'xsmall' }}>
                                                    <IconImage data={{ location: 'ClassIcons58', height: 36, width: 38 }} scale={0.4} />
                                                </Box>
                                                <Text size="small" truncate={false}>{playerData.skills.get(SkillsIndex.Sneaking)?.level}</Text>
                                            </Box>
                                            <PlayerActivity player={player} />
                                        </Box>
                                    </CharacterBox>
                                </Box>)
                        })
                    }
                </Grid>
            </Box>
            <Box>
                <Text size="large">Jade Upgrades</Text>
                <Box direction="row" wrap margin={{ top: 'large' }}>
                    <Grid columns={{ size: 'auto', count: 4 }} fill>
                        {
                            // Once I stop hiding info from people, just get rid of the filter and the unlock more upgrades to see section.
                            // For now I'm showing available ones + 3 "hidden" ones.
                            jadeUpgrades
                                .filter(upgrade => upgrade.displayOrder <= indexOfBestUpgrade + 6)
                                .map((upgrade, index) => {
                                    const canAfford = sneaking.jade > upgrade.unlockCost();
                                    return (
                                        <ShadowBox style={{ opacity: upgrade.purchased ? 1 : canAfford ? 0.6 : 0.4 }} key={index} background="dark-1" margin={{ right: 'small', bottom: 'small' }} pad="medium" gap="medium">
                                            {
                                                index > indexOfBestUpgrade + 3 ?
                                                    <Box align='center'>
                                                        Unlock more upgrades to see.
                                                    </Box> :
                                                    <Box gap="small">
                                                        <Box direction="row" gap="medium" align="center">
                                                            <IconImage data={upgrade.getImageData()} scale={0.5} />
                                                            <Text size="small">{upgrade.data.name}</Text>
                                                        </Box>
                                                        <TextAndLabel textSize='xsmall' text={upgrade.data.bonus} label={"Bonus"} />
                                                        {
                                                            !upgrade.purchased &&
                                                            <ComponentAndLabel
                                                                label={"Unlock Cost"}
                                                                component={
                                                                    <Box gap="xsmall" direction="row">
                                                                        <IconImage data={sneaking.getJadeImageData()} scale={0.5} />
                                                                        <Text color={canAfford ? 'green-1' : ''} size="small">{nFormatter(upgrade.unlockCost())}</Text>
                                                                    </Box>
                                                                }
                                                            />
                                                        }
                                                    </Box>
                                            }
                                        </ShadowBox>
                                    )
                                })

                        }
                    </Grid>
                </Box>
            </Box>
            <Box>
                <Text size="large">Sneaking Upgrades</Text>
                <Box direction="row" wrap margin={{ top: 'large' }}>
                    <Grid columns={{ size: 'medium', count: 'fill' }} fill>
                        {
                            // Once stop hiding info from people, just get rid of the filter on unlocked, the shouldBeDisplayed filter out useless placeholder bonuses
                            // For now showing only unlocked ones that are displayed in-game.
                            sneaking.upgrades
                                .filter(upgrade => upgrade.shouldBeDisplayed == true && upgrade.unlocked)
                                .map((upgrade, index) => {
                                    return (
                                        <ShadowBox style={{ opacity: upgrade.level > 0 ? 1 : 0.6 }} key={index} background="dark-1" margin={{ right: 'small', bottom: 'small' }} pad="medium" gap="medium">
                                            <Box direction="column" gap="medium">
                                                <Box direction="row" gap="medium" align="center">
                                                    <IconImage data={upgrade.getImageData()} />
                                                    <Text size="small">{upgrade.name}{upgrade.level > 0 ? " (Lv."+upgrade.level+")" : ""}</Text>
                                                </Box>
                                                <TextAndLabel textSize='xsmall' text={upgrade.getBonusText()} label={"Bonus"} />
                                                {
                                                    <ComponentAndLabel
                                                        label={upgrade.level > 0 ? "Next level cost" : "Unlock Cost"}
                                                        component={
                                                            <Box gap="xsmall" direction="row">
                                                                <IconImage data={sneaking.getJadeImageData()} scale={0.5} />
                                                                <Text size="small">{nFormatter(upgrade.nextLevelCost())}</Text>
                                                            </Box>
                                                        }
                                                    />
                                                }
                                            </Box>
                                        </ShadowBox>
                                    )
                                })

                        }
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}

export default Sneaking;