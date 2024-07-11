import {
    Box,
    Meter,
    Stack,
    Text,
} from 'grommet'
import TextAndLabel, { ComponentAndLabel } from '../../../components/base/TextAndLabel';
import { Worship as WorshipDomain } from '../../../data/domain/worship';
import ShadowBox from "../../base/ShadowBox";
import IconImage from '../../base/IconImage';
import { Player } from '../../../data/domain/player';
import { TimeDisplaySize, TimeDown } from '../../base/TimeDisplay';
import { SkillsIndex } from '../../../data/domain/SkillsIndex';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';

export function ChargeDisplay() {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    
    const playerData = theData.get("players") as Player[];
    const worship = theData.get("worship") as WorshipDomain;

    return (
        <Box gap="medium" align="center">
            {worship.bestWizardPlayerID > -1 &&
                <Box>
                    <Text size="xsmall">* This is ignoring the wizard&apos;s charge, since you can just .. use it.</Text>
                    <ShadowBox background="dark-1" pad="medium" gap="large" direction="row" wrap>
                        <ComponentAndLabel
                            label="Best Wizard"
                            component={
                                <Box direction="row" gap="small">
                                    <IconImage data={playerData[worship.bestWizardPlayerID].getClassImageData()} scale={0.8} />
                                    <Text>{playerData[worship.bestWizardPlayerID].playerName}</Text>
                                </Box>
                            }
                        />
                        <ComponentAndLabel
                            label="Charge with Charge Syphon"
                            component={
                                <Box direction="row" gap="small">
                                    <Stack>
                                        <Meter
                                            size="small"
                                            type="bar"
                                            background="accent-3"
                                            color="brand"
                                            values={[
                                                {
                                                    value: Math.round(worship.totalData.currentCharge),
                                                    label: 'Current total charge',
                                                    color: 'brand'
                                                }
                                            ]}
                                            max={worship.totalData.maxCharge} />
                                        <Box align="center" pad="xxsmall">
                                            <Text size="small">{Math.round(worship.totalData.currentCharge).toString()} ({(worship.totalData.currentCharge / worship.totalData.maxCharge * 100).toPrecision(3)}%)</Text>
                                        </Box>
                                    </Stack>
                                    <Text>{worship.totalData.maxCharge}</Text>
                                </Box>
                            }
                        />
                        <TextAndLabel label="Total Charge rate" text={`${Math.round(worship.totalData.chargeRate * 24)}% / day`} />
                        <ComponentAndLabel
                            label="Time till overflow"
                            component={
                                worship.totalData.overFlowTime > 0 ?
                                    <TimeDown size={TimeDisplaySize.Small} addSeconds={worship.totalData.overFlowTime} />
                                    : <Text>Overflowing, you are wasting charge!</Text>
                            }
                        />
                    </ShadowBox>
                </Box>
            }
            <Box direction="row" wrap justify="center">
                {playerData && playerData.map((player, index) => {
                    const timeToFull = (worship.playerData[index].maxCharge - worship.playerData[index].estimatedCharge) / (worship.playerData[index].chargeRate / 60 / 60);
                    return (
                        <ShadowBox key={index} background="dark-1" pad="medium" align="center" margin={{ right: 'large', bottom: 'small' }}>
                            <Box gap="small">
                                <Box direction="row" gap="small">
                                    <IconImage data={player.getClassImageData()} scale={0.8} />
                                    <Text>{player.playerName}</Text>
                                </Box>
                                <Box direction="row" gap="small">
                                    <Stack>
                                        <Meter
                                            size="small"
                                            type="bar"
                                            background="accent-3"
                                            color="brand"
                                            values={[
                                                {
                                                    value: Math.round(worship.playerData[index].estimatedCharge),
                                                    label: 'current',
                                                    color: 'brand'
                                                }
                                            ]}
                                            max={worship.playerData[index].maxCharge} />
                                        <Box align="center" pad="xxsmall">
                                            <Text size="small">{Math.round(worship.playerData[index].estimatedCharge).toString()} ({(worship.playerData[index].estimatedCharge / worship.playerData[index].maxCharge * 100).toPrecision(3)}%)</Text>
                                        </Box>
                                    </Stack>
                                    <Text>{worship.playerData[index].maxCharge}</Text>
                                </Box>
                                <Box direction="row" justify="between">
                                    <ComponentAndLabel
                                        label="Level"
                                        component={
                                            <Box direction="row">
                                                <Text>{player.skills.get(SkillsIndex.Worship)?.level.toString() ?? "0"}</Text>
                                                {
                                                    player.gear.tools[5] != undefined &&
                                                    <Box title={player.gear.tools[5].displayName}>
                                                        <IconImage data={player.gear.tools[5].getImageData()} scale={0.7} />
                                                    </Box>
                                                }
                                            </Box>
                                        }
                                    />
                                    <TextAndLabel label="Charge rate" text={`${Math.round(worship.playerData[index].chargeRate * 24)}% / day`} />
                                </Box>
                                <ComponentAndLabel
                                    label="Time till full"
                                    component={
                                        timeToFull > 0 ?
                                            <TimeDown size={TimeDisplaySize.Small} addSeconds={timeToFull} />
                                            : <Text>Charge is full!</Text>
                                    }
                                />
                            </Box>
                        </ShadowBox>
                    )
                })
                }
            </Box>
        </Box>
    )
}